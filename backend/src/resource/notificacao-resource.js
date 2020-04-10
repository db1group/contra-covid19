const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.salvar = async (req, res) => {
  console.log(req.body);
  const notificacao = {};

  return res.json({data: notificacao});
};

exports.consultarPorData = async (req, res) => {
  console.log(req.params);
  const notiticacoes = [];

  return res.json({data: notiticacoes});
};

exports.consultarPorId = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const notificacao = {};

  return res.json({data: notificacao});
};