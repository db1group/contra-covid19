const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Mappers = require("../mapper");
const uuid = require("uuid/v4");

exports.salvar = async (req, res) => {
  const notificacaoRequest = req.body;

  notificacaoConsolidada = await consolidarCadastros(notificacaoRequest);

  let notificacao = Mappers.Notificacao.mapearParaNotificacao(
    notificacaoConsolidada
  );

  const notificacaoSalva = await salvarNotificacao(notificacao);

  const retorno = Mappers.Notificacao.mapearParaResponse(
    notificacaoSalva,
    notificacaoSalva.NotificacaoHistorico
  );

  return res.json({
    data: {
      ...retorno,
    },
  });
};

exports.consultarPaginado = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const notificacoes = await consultarNotificaoesPaginado(page, limit);

  const notificacoesResponse = [];
  notificacoes.rows.map((notificacao) =>
    notificacoesResponse.push(
      Mappers.Notificacao.mapearParaResponse(
        notificacao,
        notificacao.NotificacaoHistorico
      )
    )
  );

  return res.json({ count: notificacoes.count, data: notificacoesResponse });
};

exports.consultarPorId = async (req, res) => {
  const { id } = req.params;
  const notificacaoModel = await consultarNotificacaoPorId(id);

  if (!notificacaoModel) return res.status(204).json();

  const retorno = Mappers.Notificacao.mapearParaResponse(
    notificacaoModel,
    notificacaoModel.NotificacaoHistorico
  );

  return res.json({ data: retorno });
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

const consolidarSuspeito = async (suspeito) => {
  const { pessoaId, bairroId, MunicipioId, nome, nomeDaMae } = suspeito;
  const suspeitoPrototipo = { bairroId, MunicipioId };

  if (pessoaId) return { ...suspeitoPrototipo, pessoaId };

  const pessoasLocalizadas = await buscarPessoaDadosBasicos(nome, nomeDaMae);
  if (pessoasLocalizadas.length === 1) {
    return { ...suspeitoPrototipo, pessoaId: pessoasLocalizadas[0].id };
  }

  console.log("Cadastrando pessoa");
  const novaPessoaCadastrada = await cadastrarSuspeito(suspeito);
  return await Mappers.Pessoa.mapearParaSuspeito(novaPessoaCadastrada);
};

const cadastrarSuspeito = async (suspeito) => {
  const pessoa = Mappers.Pessoa.mapearParaModel(suspeito);

  const pessoaCadastrada = await cadastrarPessoa(pessoa);

  const suspeitoCadastrado = Mappers.Pessoa.mapearParaSuspeito(
    pessoaCadastrada
  );
  return suspeitoCadastrado;
};

/*
  Refatorar para Repositório de Notificações ou outro local mais apropriado
*/
const consultarNotificacaoPorId = async (id) =>
  await models.Notificacao.findOne({
    where: { id },
    include: [{ model: models.Pessoa }, { model: models.NotificacaoHistorico }],
  });

const salvarNotificacao = async (notificacao) => {
  const notificacaoId = uuid();
  const notificacaoComId = {
    id: notificacaoId,
    ...notificacao,
    notificacaoHistorico: {
      id: uuid(),
      notificacaoId,
      ...notificacao.notificacaoHistorico,
    },
  };

  await models.Notificacao.create(notificacaoComId);
  await models.NotificacaoHistorico.create(
    notificacaoComId.notificacaoHistorico
  );
  return await consultarNotificacaoPorId(notificacaoId);
};

const consultarNotificaoesPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;
  return await models.Notificacao.findAndCountAll({
    include: [{ model: models.Pessoa }, { model: models.NotificacaoHistorico }],
    order: [["updatedAt", "DESC"]],
    limit: limit,
    offset: offset,
  });
};

/* 
  Refatorar para repositório de pessoas ou outro local apropriado
*/
const cadastrarPessoa = async (pessoa) => {
  pessoa.id = uuid();
  const pessoaCadastrada = await models.Pessoa.create(pessoa);
  return pessoaCadastrada.dataValues;
};

const buscarPessoaDadosBasicos = async (nome, nomeDaMae) =>
  await models.Pessoa.findAll({
    where: { nome, nomeDaMae },
  });
