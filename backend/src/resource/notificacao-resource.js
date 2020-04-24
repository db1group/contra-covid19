const { Sequelize } = require('sequelize');
const models = require('../models');
const Mappers = require('../mapper');
const { tratarErrorsRetornoAPI, RegraNegocio } = require('../lib/erros');


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

  const suspeitoCadastrado = Mappers.Pessoa.mapearParaSuspeito(
    pessoaCadastrada,
  );
  return suspeitoCadastrado;
};

const buscarPessoaDadosBasicos = async (nome, nomeDaMae) => models.Pessoa.findAll({
  where: { nome, nomeDaMae },
});


const obterGestante = (sexo, gestante) => {
  if (sexo === 'M') {
    return 'NAO_APLICADO';
  }
  if (gestante) {
    return 'SIM';
  }
  return 'NAO';
};

const consolidarSuspeito = async (suspeito) => {
  const {
    pessoaId, bairroId, MunicipioId, nome, nomeDaMae,
    sexo, gestante,
  } = suspeito;

  let suspeitoPrototipo = { bairroId, MunicipioId };

  if (pessoaId) return { ...suspeitoPrototipo, pessoaId };

  const suspeitoAlterado = { ...suspeito };
  suspeitoAlterado.gestante = obterGestante(sexo, gestante);
  suspeitoPrototipo = { ...suspeitoPrototipo, gestante };

  const pessoasLocalizadas = await buscarPessoaDadosBasicos(nome, nomeDaMae);
  if (pessoasLocalizadas.length === 1) {
    return { ...suspeitoPrototipo, pessoaId: pessoasLocalizadas[0].id };
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
      include: {
        model: models.Bairro,
        include: {
          model: models.Municipio,
        },
      },
    },
    { model: models.NotificacaoCovid19 },
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

const notificacaoAbertaJaExisteParaOPaciente = async (tipoDocumento, numeroDocumento) => {
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
    notificacaoRequest.suspeito.tipoDocumento,
    notificacaoRequest.suspeito.numeroDocumento,
  );

  if (existeNotificacaoAbertaParaOPaciente) {
    throw new RegraNegocio('Já existe uma notificação aberta para este paciente.');
  }
};

exports.salvar = async (req, res) => {
  try {
    const notificacaoRequest = req.body;

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
  } catch (err) {
    return tratarErrorsRetornoAPI(res, err);
  }
};

exports.consultarPaginado = async (req, res) => {
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
};

const consultarNotificaoesWeb = async (page, limit, search = '') => {
  const offset = (page - 1) * limit;
  const optionsConsulta = {
    where: {
      status: {
        [Op.ne]: 'EXCLUIDA',
      },
    },
    attributes: ['id', 'status'],
    include: [{
      model: models.Pessoa,
      attributes: ['nome', 'numeroDocumento', 'telefoneContato'],
    }, {
      model: models.NotificacaoCovid19,
      attributes: ['dataHoraNotificacao', 'situacaoNoMomentoDaNotificacao'],
    }, {
      model: models.UnidadeSaude,
      attributes: ['nome'],
    }],
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  };
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

exports.consultarNotificacoesWeb = async (req, res) => {
  const { page = 1, itemsPerPage = 10, search = '' } = req.query;
  const notificacoes = await consultarNotificaoesWeb(page, itemsPerPage, search);
  if (!notificacoes) return res.json(consultarNotificacoesWebVazia);
  const notificacaoConsulta = Mappers.Notificacao.mapearParaConsulta(notificacoes.rows);
  return res.json({ count: notificacoes.count, data: notificacaoConsulta });
};

exports.consultarPorId = async (req, res) => {
  const { id } = req.params;
  const notificacaoModel = await consultarNotificacaoPorId(id);

  if (!notificacaoModel) return res.status(204).json();

  const retorno = Mappers.Notificacao.mapearParaResponse(
    notificacaoModel,
    notificacaoModel.NotificacaoCovid19,
  );

  return res.json({ data: retorno });
};

exports.excluirLogicamenteNotificacao = async (req, res) => {
  const { id } = req.params;
  await models.Notificacao.update(
    { status: 'EXCLUIDA' },
    { where: { id } },
  );
  return res.status(204).json();
};

exports.excluirLoteLogicamenteNotificacao = async (req, res) => {
  const ids = req.body;
  await models.Notificacao.update(
    { status: 'EXCLUIDA' },
    { where: { id: { [Op.in]: ids } } },
  );
  return res.status(204).json();
};

exports.consultarNotificacaoEvolucao = async (req, res) => {
  const { id } = req.params;
  const notificacaoEvolucao = await models.Notificacao.findOne({
    where: { id },
    attributes: ['status'],
    include: [{
      model: models.Pessoa,
      attributes: ['nome', 'numeroDocumento', 'telefoneContato'],
    },
    { model: models.NotificacaoEvolucao },
    ],
  });
  if (!notificacaoEvolucao) res.status(404).json({ error: 'Notificação não encontrada.' });
  if (notificacaoEvolucao.status !== 'ABERTA') res.status(400).json({ error: 'Notificação não está mais aberta.' });

  return res.json({ data: notificacaoEvolucao });
};

const validarNotificacaoFinalizada = async (evolucao) => {
  const notificacaoFinalizada = await models.Notificacao.findOne({
    attributes: ['status'],
    where: {
      id: evolucao.notificacaoId,
      [Op.or]: [{ status: 'ENCERRADA' }, { status: 'EXCLUIDA' }],
    },
  });

  if (notificacaoFinalizada) {
    throw new RegraNegocio(`Não é possível adicionar nova evolução pois a notificação está ${
      notificacaoFinalizada.status}.`);
  }
};

const validarPossuiConfirmacao = async (evolucao) => {
  const tpEvolucaoPrecisaTerConfirmacao = (evolucao.tpEvolucao === 'CURA'
      || evolucao.tpEvolucao === 'OBITO');

  const tpEvolucaoProibidaSeJaConfirmada = (evolucao.tpEvolucao === 'SUSPEITO'
      || evolucao.tpEvolucao === 'DESCARTADO'
      || evolucao.tpEvolucao === 'CONFIRMADO');

  if (!(tpEvolucaoPrecisaTerConfirmacao || tpEvolucaoProibidaSeJaConfirmada)) {
    return;
  }

  const evolucaoConfirmado = await models.NotificacaoEvolucao.findOne({
    attributes: ['tpEvolucao'],
    where: {
      notificacaoId: evolucao.notificacaoId,
      tpEvolucao: 'CONFIRMADO',
    },
  });

  if (evolucaoConfirmado && tpEvolucaoProibidaSeJaConfirmada) {
    throw new RegraNegocio(`Não é possivel atualizar para ${evolucao.tpEvolucao}
      pois já existe atualização de confirmação.`);
  }

  if (!evolucaoConfirmado && tpEvolucaoPrecisaTerConfirmacao) {
    throw new RegraNegocio(`Não é possivel atualizar para ${evolucao.tpEvolucao}
      pois não existe atualização de confirmação.`);
  }
};

const encerrarNotificacao = async (evolucao, t) => {
  const deveEncerrar = (evolucao.tpEvolucao === 'CURA'
    || evolucao.tpEvolucao === 'DESCARTADO'
    || evolucao.tpEvolucao === 'ENCERRADO'
    || evolucao.tpEvolucao === 'OBITO');

  if (!deveEncerrar) {
    return;
  }

  await models.Notificacao.update(
    { status: 'ENCERRADA' },
    {
      where: { id: evolucao.notificacaoId },
      transaction: t,
    },
  );
};

exports.salvarEvolucao = async (req, res) => {
  try {
    const result = await models.sequelize.transaction(async (t) => {
      const evolucaoReq = req.body;

      await validarNotificacaoFinalizada(evolucaoReq);
      await validarPossuiConfirmacao(evolucaoReq);

      const evolucao = await models.NotificacaoEvolucao.create(evolucaoReq, { transaction: t });

      await encerrarNotificacao(evolucaoReq, t);
      return evolucao;
    });

    return res.json({ data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};
