const Sequelize = require('sequelize');
const models = require('../models');
const Mappers = require('../mapper');

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

  return {
    ...notificacao,
    suspeito: suspeitoConsolidado,
  };
};

/*
  Refatorar para Repositório de Notificações ou outro local mais apropriado
*/
const consultarNotificacaoPorId = async (id) => models.Notificacao.findOne({
  where: { id },
  include: [{ model: models.Pessoa }, { model: models.NotificacaoCovid19 }],
});

const salvarNotificacao = async (notificacao) => {
  const novaNotificacao = await models.Notificacao.create(notificacao);
  const { id: notificacaoId } = novaNotificacao;
  await models.NotificacaoCovid19.create({ notificacaoId, ...notificacao.notificacaoCovid19 });
  return consultarNotificacaoPorId(notificacaoId);
};

const consultarNotificaoesPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;
  return models.Notificacao.findAndCountAll({
    include: [{ model: models.Pessoa }, { model: models.NotificacaoCovid19 }],
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
};

exports.salvar = async (req, res) => {
  try {
    const notificacaoRequest = req.body;

    const notificacaoConsolidada = await consolidarCadastros(notificacaoRequest);

    const notificacao = Mappers.Notificacao.mapearParaNotificacao(
      notificacaoConsolidada,
    );

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
    console.error(err);
    return res.status(400).json({ error: err.message });
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
    attributes: ['id'],
    include: [{ model: models.Pessoa, attributes: ['nome', 'numeroDocumento', 'telefoneContato'] }, {
      model: models.NotificacaoCovid19,
      attributes: ['dataHoraNotificacao', 'situacaoNoMomentoDaNotificacao'],
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
            { '$Pessoa.nome$': { [Op.like]: `%${search}%` } },
            { '$Pessoa.numeroDocumento$': { [Op.like]: `%${search}%` } },
          ],
        }],
    };
  }
  return models.Notificacao.findAndCountAll(optionsConsulta);
};

exports.consultarNotificacoesWeb = async (req, res) => {
  const { page = 1, itemsPerPage = 10, search = '' } = req.query;
  const notificacoes = await consultarNotificaoesWeb(page, itemsPerPage, search);
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
  const { page = 1, itemsPerPage = 10 } = req.query;
  const offset = (page - 1) * itemsPerPage;

  const notificacaoEvolucao = await models.Notificacao.findAndCountAll({
    where: { id },
    attributes: ['id', 'status'],
    include: [{
      model: models.Pessoa,
      attributes: ['id', 'nome', 'numeroDocumento', 'telefoneContato'],
    },
    { model: models.NotificacaoEvolucao, limit: itemsPerPage, offset },
    ],
  });

  return res.json({ data: notificacaoEvolucao });
};
