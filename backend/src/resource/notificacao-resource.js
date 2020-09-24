const { Sequelize } = require('sequelize');
const models = require('../models');
const repos = require('../repositories/repository-factory');
const Mappers = require('../mapper');
const { RegraNegocioErro, UsuarioNaoAutorizadoErro } = require('../lib/erros');
const { UsuarioLogado } = require('../secure/usuario-logado');

const DocumentValidator = require('../validations/custom/document-validator');
const TipoClassificacaoPessoaEnum = require('../enums/tipo-classificacao-pessoa-enum');
const atualizacaoNotificacaoService = require('../services/atualizar-notificacao-service');
const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');
const statusNotificacaoEnum = require('../enums/status-notificacao-enum');

const { Op } = Sequelize;

/*
  Refatorar para repositório de pessoas ou outro local apropriado
*/
const cadastrarPessoa = async (pessoa) => {
  const pessoaCadastrada = await models.Pessoa.create(pessoa);
  return pessoaCadastrada.dataValues;
};

const cadastrarSuspeito = async (suspeito) => {
  const pessoa = Mappers.Pessoa.mapearParaModel(suspeito);

  const pessoaCadastrada = await cadastrarPessoa(pessoa);

  return Mappers.Pessoa.mapearParaSuspeito(
    pessoaCadastrada,
  );
};

const obterGestante = (sexo, gestante) => {
  if (sexo === 'M') {
    return 'NAO_APLICADO';
  }
  return gestante;
};

const validarDocumento = ({ tipoClassificacaoPessoa, tipoDocumento, numeroDocumento }) => {
  if (tipoDocumento !== DocumentValidator.docs.CPF) return true;

  if (tipoClassificacaoPessoa !== TipoClassificacaoPessoaEnum.values.Outro
    && !numeroDocumento) return true;

  return DocumentValidator.IsCpfValid(numeroDocumento);
};

const consolidarSuspeito = async (suspeito) => {
  const {
    pessoaId, bairroId, municipioId,
    sexo, gestante, tipoDocumento,
  } = suspeito;

  if (!validarDocumento(suspeito)) {
    throw new RegraNegocioErro(`${tipoDocumento} inválido.`);
  }

  let suspeitoPrototipo = { bairroId, municipioId };

  if (pessoaId) return { ...suspeitoPrototipo, pessoaId };

  const suspeitoAlterado = { ...suspeito };
  suspeitoAlterado.gestante = obterGestante(sexo, gestante);
  suspeitoPrototipo = { ...suspeitoPrototipo, gestante };

  const pessoaIdLocalizada = await repos.notificacaoRepository.buscarPessoaId(suspeito);
  if (pessoaIdLocalizada) {
    return { ...suspeitoPrototipo, pessoaId: pessoaIdLocalizada };
  }

  const novaPessoaCadastrada = await cadastrarSuspeito(suspeitoAlterado);
  return Mappers.Pessoa.mapearParaSuspeito(novaPessoaCadastrada);
};

/*
  Refatorar para um serviço de Notificação ou outro local apropriado
*/
const consolidarCadastros = async ({ suspeito, ...notificacao }) => {
  const suspeitoConsolidado = await consolidarSuspeito(suspeito);
  const { municipioId } = suspeito;
  const { unidadeSaudeId } = notificacao;

  const unidadeDeSaude = await models.UnidadeSaude.findOne(
    {
      where: { id: unidadeSaudeId },
    },
  );

  if (!unidadeDeSaude) {
    throw new RegraNegocioErro(`Não foi localizada a unidade de saúde com o código ${unidadeSaudeId}`);
  }

  return {
    ...notificacao,
    suspeito: {
      municipioId,
      ...suspeitoConsolidado,
    },
    unidadeDeSaude: {
      ...unidadeDeSaude.dataValues,
    },
  };
};

/*
  Refatorar para Repositório de Notificações ou outro local mais apropriado
*/
const consultarNotificacaoPorId = async (id, tenant) => models.Notificacao.findOne({
  where: { id, municipioId: tenant },
  include: [
    {
      model: models.Pessoa,
      include: [
        { model: models.Bairro },
        { model: models.Municipio },
        { model: models.Ocupacao },
      ],
    },
    { model: models.NotificacaoCovid19 },
    { model: models.Municipio },
    { model: models.UnidadeSaude },
    { model: models.User },
    { model: models.ProfissionalSaude },
    { model: models.Profissao },
  ],
});

const salvarNotificacao = async (notificacao) => {
  const transaction = await models.sequelize.transaction();
  try {
    const novaNotificacao = await models.Notificacao.create(
      notificacao, { transaction },
    );
    const { id: notificacaoId } = novaNotificacao;
    await models.NotificacaoCovid19.create({
      notificacaoId,
      ...notificacao.notificacaoCovid19,
      tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria.values.PendenteEnvio,
    }, { transaction });
    await models.NotificacaoEvolucao.create({
      notificacaoId,
      dtEvolucao: notificacao.notificacaoCovid19.dataHoraNotificacao,
      tpEvolucao: 'SUSPEITO',
      tpLocal: notificacao.notificacaoCovid19.situacaoNoMomentoDaNotificacao,
    }, { transaction });
    await transaction.commit();
    return consultarNotificacaoPorId(notificacaoId, notificacao.municipioId);
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const notificacaoAbertaJaExisteParaOPaciente = async ({ tipoDocumento, numeroDocumento }) => {
  if (!tipoDocumento) return false;
  if (!numeroDocumento) return false;

  const status = 'ABERTA';
  const notificacao = await models.Notificacao.count({
    where: {
      status,
    },
    include: {
      model: models.Pessoa,
      where: {
        [Op.and]: [{
          tipoDocumento,
        }, {
          numeroDocumento,
        }],
      },
      attributes: ['tipoDocumento', 'numeroDocumento'],
    },
  });

  return notificacao > 0;
};

const validarNotificacaoUnicaPorPaciente = async (notificacaoRequest) => {
  const existeNotificacaoAbertaParaOPaciente = await notificacaoAbertaJaExisteParaOPaciente(
    notificacaoRequest.suspeito,
  );

  if (existeNotificacaoAbertaParaOPaciente) {
    throw new RegraNegocioErro('Já existe uma notificação aberta para este paciente.');
  }
};

const validarNotificacaoPacienteObito = async (notificacaoRequest) => {
  const existeNotificacao = await repos.notificacaoRepository.notificacaoPacienteObito(
    notificacaoRequest.suspeito,
  );

  if (existeNotificacao) {
    throw new RegraNegocioErro('Já existe uma notificação para este paciente que foi a óbito.');
  }
};

const retornarUsuarioLogado = async (email) => {
  const user = await models.User.findOne({
    attributes: ['id'],
    where: { email },
  });
  if (!user) throw new RegraNegocioErro('Usuário não encontrado!');
  return user.id;
};

exports.salvar = async (req, res, next) => {
  const notificacaoRequest = req.body;
  try {
    const { tenant, email } = new UsuarioLogado(req);
    notificacaoRequest.userId = await retornarUsuarioLogado(email);
    await validarNotificacaoPacienteObito(notificacaoRequest);
    await validarNotificacaoUnicaPorPaciente(notificacaoRequest);

    const notificacaoConsolidada = await consolidarCadastros(notificacaoRequest);

    const notificacao = Mappers.Notificacao.mapearParaNotificacao(
      notificacaoConsolidada,
    );

    notificacao.municipioId = tenant;
    notificacao.status = statusNotificacaoEnum.values.Aberta;
    const notificacaoSalva = await salvarNotificacao(notificacao);

    const retorno = Mappers.Notificacao.mapearParaResponse(
      notificacaoSalva,
      notificacaoSalva.NotificacaoCovid19,
    );

    return res.json({
      data: {
        ...retorno,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  const { id } = req.params;
  const notificacaoRequest = req.body;
  try {
    const usuarioLogado = new UsuarioLogado(req);
    notificacaoRequest.id = id;
    await atualizacaoNotificacaoService.handle(notificacaoRequest, usuarioLogado);

    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

const obterCampoOrdenacao = async (sortBy) => {
  const ordernacaoIndice = {
    createdAt: 'Notificacao.createdAt',
    nome: 'Pessoa.nome',
    documento: 'Pessoa.numeroDocumento',
    telefone: 'Pessoa.telefoneContato',
    dataNotificacao: 'NotificacaoCovid19.dataHoraNotificacao',
    unidade: 'UnidadeSaude.nome',
    status: 'Notificacao.status',
  };

  if (!sortBy) {
    return ordernacaoIndice.createdAt;
  }
  return ordernacaoIndice[sortBy];
};

const consultarNotificaoesWeb = async (page, limit, sortBy, sortDesc, search = '', status = '', tenant) => {
  const campoOrdenacao = await obterCampoOrdenacao(sortBy);
  if (!campoOrdenacao) throw new RegraNegocioErro(`O campo ${sortBy} não é ordenável.`);
  const ordem = sortDesc === 'true' ? 'DESC' : 'ASC';
  const offset = (page - 1) * limit;
  const optionsConsulta = {
    where: {
      status: {
        [Op.ne]: statusNotificacaoEnum.values.Excluida,
      },
      municipioId: tenant,
    },
    attributes: ['id', 'unidadeSaudeId', 'status', 'createdAt'],
    include: [{
      model: models.Pessoa,
      attributes: ['nome', 'numeroDocumento', 'telefoneContato'],
      include: models.Municipio,
    }, {
      model: models.NotificacaoCovid19,
      attributes: ['dataHoraNotificacao', 'situacaoNoMomentoDaNotificacao', 'apiSecretariaId'],
    },
    {
      model: models.UnidadeSaude,
      attributes: ['nome'],
    }],
    order: [[Sequelize.col(campoOrdenacao), ordem]],
    limit,
    offset,
  };
  if (status !== '') {
    optionsConsulta.where.status = {
      [Op.and]: [
        optionsConsulta.where.status,
        {
          [Op.eq]: status,
        },
      ],
    };
  }
  if (search !== '') {
    optionsConsulta.where = {
      [Op.and]: [
        { ...optionsConsulta.where },
        {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn('upper', Sequelize.col('Pessoa.nome')),
              {
                [Op.like]: `%${search.toUpperCase()}%`,
              },
            ),
            Sequelize.where(
              Sequelize.fn('upper', Sequelize.col('Pessoa.numeroDocumento')),
              {
                [Op.like]: `%${search.toUpperCase()}%`,
              },
            ),
          ],
        }],
    };
  }
  return models.Notificacao.findAndCountAll(optionsConsulta);
};

const consultarNotificacoesWebVazia = {
  count: 0,
  data: [],
};

exports.consultarNotificacoesWeb = async (req, res, next) => {
  try {
    const {
      page = 1, itemsPerPage = 10, search = '', sortBy, sortDesc, status,
    } = req.query;
    const { tenant } = new UsuarioLogado(req);
    const notificacoes = await consultarNotificaoesWeb(
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
      search,
      status,
      tenant,
    );
    if (!notificacoes) return res.json(consultarNotificacoesWebVazia);
    const notificacaoConsulta = Mappers.Notificacao.mapearParaConsulta(notificacoes.rows);
    return res.json({ count: notificacoes.count, data: notificacaoConsulta });
  } catch (err) {
    return next(err);
  }
};

exports.consultarPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioLogado = new UsuarioLogado(req);
    const notificacaoModel = await repos.notificacaoRepository.getPorId(id, usuarioLogado.tenant);
    if (!notificacaoModel) throw new RegraNegocioErro('Notificação não encontrada.');

    const { email } = req.kauth.grant.access_token.content;
    const user = await repos.usuarioRepository.getPorEmail(email, usuarioLogado.tenant);
    if (!user) throw new RegraNegocioErro('Usuário não encontrado.');

    if (!usuarioLogado.isRoleSecretariaSaude() && !usuarioLogado.isRoleVisualizaNotificacoes()) {
      const msgErro = 'Você não possui autorização para visualizar esta notificação.';

      const unidadesSaudeUser = await repos.unidadeSaudeRepository
        .getPorUserEmail(email, usuarioLogado.tenant);

      if (!unidadesSaudeUser) throw new UsuarioNaoAutorizadoErro(msgErro);

      if (!unidadesSaudeUser.some((data) => data.id === notificacaoModel.unidadeSaudeId)) {
        throw new UsuarioNaoAutorizadoErro(msgErro);
      }
    }

    const fechamentos = await repos.notificacaoRepository
      .getFechamentosPorNotificacaoId(id, usuarioLogado.tenant);
    const possuiFechamento = fechamentos.length > 0;
    const retorno = Mappers.Notificacao.mapearParaResponse(
      notificacaoModel,
      notificacaoModel.NotificacaoCovid19,
      possuiFechamento,
    );

    return res.json({ data: retorno });
  } catch (err) {
    console.error('Erro Consulta Notificação: ', err);
    return next(err);
  }
};

const alterarStatusNotificacao = async (id, status) => {
  await models.Notificacao.update(
    { status },
    { where: { id } },
  );
};

exports.excluirLogicamenteNotificacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const notificacao = await models.Notificacao
      .findOne({ where: { id, municipioId: tenant } });
    if (!notificacao) throw new RegraNegocioErro('Notificação não encontrada');
    await alterarStatusNotificacao(id, statusNotificacaoEnum.values.Excluida);
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

exports.vincular = async (req, res, next) => {
  const { id, estadoId } = req.params;
  try {
    const { tenant } = new UsuarioLogado(req);
    const notificacao = await models.Notificacao
      .findOne({ where: { id, municipioId: tenant } });
    if (!notificacao) throw new RegraNegocioErro('Notificação não encontrada');
    await models.NotificacaoCovid19.update({
      apiSecretariaId: estadoId,
      tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria.values.Enviada,
    }, { where: { notificacaoId: id } });
    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};
