const { Sequelize } = require('sequelize');
const models = require('../models');
const { camposControleLeitos, leitosDisponiveis } = require('../lib/controleLeitos');
const RegraNegocioErro = require('../lib/erros/RegraNegocioErro');

const { Op } = Sequelize;

exports.consultarPorUnidadeSaude = async (req, res, next) => {
  try {
    const { unidadeSaudeId } = req.params;
    const { page = 1, itemsPerPage: limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;
    const where = { unidadeSaudeId };
    if (search.trim() !== '') {
      where.dtNotificacao = { [Op.gte]: search };
    }

    const notificaLeitos = await models.NotificaLeito.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return res.json({ count: notificaLeitos.count, data: [...notificaLeitos.rows] });
  } catch (err) {
    return next(err);
  }
};

exports.consultarPorId = async (req, res) => {
  const { unidadeSaudeId, id } = req.params;
  const notificaLeito = await models.NotificaLeito.findOne({
    where: { unidadeSaudeId, id },
    include: models.ControleLeito,
  });
  if (!notificaLeito) return res.status(404).json({ error: 'Notificação do Leito não encontrada!' });
  return res.json({ data: notificaLeito });
};

// eslint-disable-next-line consistent-return
exports.cadastrar = async (req, res, next) => {
  try {
    const { unidadeSaudeId } = req.params;
    const { ControleLeito, dtNotificacao } = req.body;
    const notificaLeito = { dtNotificacao, unidadeSaudeId };

    const unidadeSaude = await models.UnidadeSaude.findOne({ where: { id: unidadeSaudeId } });
    if (!unidadeSaude) return res.status(404).json({ error: 'Unidade de saúde não encontrada!' });

    const leitosUnidade = camposControleLeitos(unidadeSaude);
    if (!leitosDisponiveis(ControleLeito, leitosUnidade)) {
      throw new RegraNegocioErro('Não pode ser informado mais leitos do que configurados na Unidade de Saúde.');
    }
    models.sequelize.transaction(async (transaction) => {
      const controleLeito = await models.ControleLeito.create(ControleLeito, { transaction });
      notificaLeito.controleLeitoId = controleLeito.id;
      const leito = await models.NotificaLeito.create(notificaLeito, { transaction });
      return res.json({ data: { ...leito.toJSON(), ControleLeito: controleLeito } });
    });
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
exports.atualizar = async (req, res, next) => {
  try {
    const { unidadeSaudeId, id } = req.params;
    const { ControleLeito, dtNotificacao } = req.body;

    const unidadeSaude = await models.UnidadeSaude.findOne({ where: { id: unidadeSaudeId } });
    if (!unidadeSaude) return res.status(404).json({ error: 'Unidade de Saúde não encontrada!' });

    const notificaLeito = await models.NotificaLeito.findOne({ where: { id } });
    if (!notificaLeito) return res.status(404).json({ error: 'Notificação do leito não encontrada!' });

    const leitosUnidade = camposControleLeitos(unidadeSaude);
    if (!leitosDisponiveis(ControleLeito, leitosUnidade)) {
      throw new RegraNegocioErro('Não pode ser informado mais leitos do que configurados na Unidade de Saúde.');
    }

    models.sequelize.transaction(async (transaction) => {
      await models.ControleLeito.update(ControleLeito,
        { where: { id: notificaLeito.controleLeitoId } },
        { transaction });

      await models.NotificaLeito.update({ dtNotificacao, unidadeSaudeId },
        { where: { id } },
        { transaction });
      return res.status(204).send();
    });
  } catch (err) {
    return next(err);
  }
};
exports.deletar = async (req, res, next) => {
  try {
    const { unidadeSaudeId, id } = req.params;
    const notificaLeito = await models.NotificaLeito.findOne({ where: { id } });
    if (!notificaLeito) return res.status(404).json({ error: 'Notificação do leito não encontrada!' });
    await models.NotificaLeito.destroy({ where: { id, unidadeSaudeId } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
