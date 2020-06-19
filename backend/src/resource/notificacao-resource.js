const { Sequelize } = require('sequelize');
const models = require('../models');
const repos = require('../repositories/repository-factory');
const Mappers = require('../mapper');
const { RegraNegocioErro, UsuarioNaoAutorizadoErro } = require('../lib/erros');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { normalizarTexto } = require('../lib/normalizar-texto');
const DocumentValidator = require('../validations/custom/document-validator');
const TipoClassificacaoPessoaEnum = require('../enums/tipo-classificacao-pessoa-enum');
const atualizacaoNotificacaoService = require('../services/atualizar-notificacao-service');

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

const buscarPessoasDadosBasicos = async (nome, nomeDaMae) => models.Pessoa.findAll({
  where: {
    nome: normalizarTexto(nome),
    nomeDaMae: normalizarTexto(nomeDaMae),
  },
});


const obterGestante = (sexo, gestante) => {
  if (sexo === 'M') {
    return 'NAO_APLICADO';
  }
  return gestante;
};

const buscarPessoaPorDocumento = async ({ tipoDocumento, numeroDocumento }) => {
  if (!tipoDocumento || tipoDocumento.trim() === '') return null;
  if (!numeroDocumento || numeroDocumento.trim() === '') return null;
  return models.Pessoa.findOne({
    where: {
      tipoDocumento,
      numeroDocumento,
    },
  });
};

const buscarPessoaId = async (suspeito) => {
  const { nome, nomeDaMae } = suspeito;

  if (suspeito.numeroDocumento !== '') {
    let pessoaId;
    const pessoaLocalizada = await buscarPessoaPorDocumento(suspeito);
    if (pessoaLocalizada) pessoaId = pessoaLocalizada.id;
    return pessoaId;
  }

  const pessoasLocalizadas = await buscarPessoasDadosBasicos(nome, nomeDaMae);
  if (pessoasLocalizadas.length >= 1) {
    throw new RegraNegocioErro(`A pessoa ${nome} (sem documento informado) já possui cadastro no sistema e não poderá ser criado um novo.`);
  }
  return null;
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

  const pessoaIdLocalizada = await buscarPessoaId(suspeito);
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
const consultarNotificacaoPorId = async (id) => models.Notificacao.findOne({
  where: { id },
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
      { ...notificacao, dtSuspeito: models.sequelize.literal('CURRENT_TIMESTAMP') },
      { transaction },
    );
    const { id: notificacaoId } = novaNotificacao;
    await models.NotificacaoCovid19.create({
      notificacaoId,
      ...notificacao.notificacaoCovid19,
    }, { transaction });
    await models.NotificacaoEvolucao.create({
      notificacaoId,
      dtEvolucao: notificacao.notificacaoCovid19.dataHoraNotificacao,
      tpEvolucao: 'SUSPEITO',
      tpLocal: notificacao.notificacaoCovid19.situacaoNoMomentoDaNotificacao,
    }, { transaction });
    await transaction.commit();
    return consultarNotificacaoPorId(notificacaoId);
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const consultarNotificaoesPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;
  return models.Notificacao.findAndCountAll({
    include: [{
      model: models.Pessoa,
      include: [{
        model: models.Bairro,
      }],
    }, { model: models.NotificacaoCovid19 }],
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
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
    const { email } = req.kauth.grant.access_token.content;
    notificacaoRequest.userId = await retornarUsuarioLogado(email);
    await validarNotificacaoUnicaPorPaciente(notificacaoRequest);

    const notificacaoConsolidada = await consolidarCadastros(notificacaoRequest);

    const notificacao = Mappers.Notificacao.mapearParaNotificacao(
      notificacaoConsolidada,
    );
    notificacao.status = 'ABERTA';

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

exports.consultarPaginado = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const notificacoes = await consultarNotificaoesPaginado(page, limit);

    const notificacoesResponse = [];
    notificacoes.rows.map((notificacao) => notificacoesResponse.push(
      Mappers.Notificacao.mapearParaResponse(
        notificacao,
        notificacao.NotificacaoCovid19,
      ),
    ));

    return res.json({ count: notificacoes.count, data: notificacoesResponse });
  } catch (err) {
    return next(err);
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

const consultarNotificaoesWeb = async (page, limit, sortBy, sortDesc, search = '', status = '') => {
  const campoOrdenacao = await obterCampoOrdenacao(sortBy);
  if (!campoOrdenacao) throw new RegraNegocioErro(`O campo ${sortBy} não é ordenável.`);
  const ordem = sortDesc === 'true' ? 'DESC' : 'ASC';
  const offset = (page - 1) * limit;
  const optionsConsulta = {
    where: {
      status: {
        [Op.ne]: 'EXCLUIDA',
      },
    },
    attributes: ['id', 'unidadeSaudeId', 'status', 'createdAt'],
    include: [{
      model: models.Pessoa,
      attributes: ['nome', 'numeroDocumento', 'telefoneContato'],
      include: models.Municipio,
    }, {
      model: models.NotificacaoCovid19,
      attributes: ['dataHoraNotificacao', 'situacaoNoMomentoDaNotificacao'],
    }, {
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
    const notificacoes = await consultarNotificaoesWeb(
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
      search,
      status,
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
    const notificacaoModel = await repos.notificacaoRepository.getPorId(id);
    if (!notificacaoModel) return res.status(204).json();

    const { email } = req.kauth.grant.access_token.content;
    const user = await repos.usuarioRepository.getPorEmail(email);
    if (!user) throw new RegraNegocioErro('Usuário não encontrado.');

    const usuarioLogado = new UsuarioLogado(req);
    if (!usuarioLogado.isRoleSecretariaSaude() && !usuarioLogado.isRoleVisualizaNotificacoes()) {
      const msgErro = 'Você não possui autorização para visualizar esta notificação.';

      const unidadesSaudeUser = await repos.unidadeSaudeRepository
        .getPorUserEmail(email);

      if (!unidadesSaudeUser) throw new UsuarioNaoAutorizadoErro(msgErro);

      if (!unidadesSaudeUser.some((data) => data.id === notificacaoModel.unidadeSaudeId)) {
        throw new UsuarioNaoAutorizadoErro(msgErro);
      }
    }

    const fechamentos = await repos.notificacaoRepository.getFechamentosPorNotificacaoId(id);
    const possuiFechamento = fechamentos.length > 0;
    const retorno = Mappers.Notificacao.mapearParaResponse(
      notificacaoModel,
      notificacaoModel.NotificacaoCovid19,
      possuiFechamento,
    );

    return res.json({ data: retorno });
  } catch (err) {
    return next(err);
  }
};

exports.excluirLogicamenteNotificacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    await models.Notificacao.update(
      { status: 'EXCLUIDA' },
      { where: { id } },
    );
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

exports.excluirLoteLogicamenteNotificacao = async (req, res, next) => {
  try {
    const ids = req.body;
    await models.Notificacao.update(
      { status: 'EXCLUIDA' },
      { where: { id: { [Op.in]: ids } } },
    );
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};
