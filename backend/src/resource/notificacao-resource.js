const models = require('../models');

const Mappers = require('../mapper');

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

const consolidarSuspeito = async (suspeito) => {
  const {
    pessoaId, bairroId, MunicipioId, nome, nomeDaMae,
  } = suspeito;
  const suspeitoPrototipo = { bairroId, MunicipioId };

  if (pessoaId) return { ...suspeitoPrototipo, pessoaId };

  const pessoasLocalizadas = await buscarPessoaDadosBasicos(nome, nomeDaMae);
  if (pessoasLocalizadas.length === 1) {
    return { ...suspeitoPrototipo, pessoaId: pessoasLocalizadas[0].id };
  }

  const novaPessoaCadastrada = await cadastrarSuspeito(suspeito);
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
  include: [{ model: models.Pessoa }, { model: models.NotificacaoHistorico }],
});

const salvarNotificacao = async (notificacao) => {
  const novaNotificacao = await models.Notificacao.create(notificacao);
  const { id: notificacaoId } = novaNotificacao;
  await models.NotificacaoHistorico.create({ notificacaoId, ...notificacao.notificacaoHistorico });
  return consultarNotificacaoPorId(notificacaoId);
};

const consultarNotificaoesPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;
  return models.Notificacao.findAndCountAll({
    include: [{ model: models.Pessoa }, { model: models.NotificacaoHistorico }],
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
};


exports.consultarPaginado = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const notificacoes = await consultarNotificaoesPaginado(page, limit);

  const notificacoesResponse = [];
  notificacoes.rows.map((notificacao) => notificacoesResponse.push(
    Mappers.Notificacao.mapearParaResponse(
      notificacao,
      notificacao.NotificacaoHistorico,
    ),
  ));

  return res.json({ count: notificacoes.count, data: notificacoesResponse });
};

exports.consultarPorId = async (req, res) => {
  const { id } = req.params;
  const notificacaoModel = await consultarNotificacaoPorId(id);

  if (!notificacaoModel) return res.status(404).json();

  const retorno = Mappers.Notificacao.mapearParaResponse(
    notificacaoModel,
    notificacaoModel.NotificacaoHistorico,
  );

  return res.json({ data: retorno });
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
      notificacaoSalva.NotificacaoHistorico,
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
