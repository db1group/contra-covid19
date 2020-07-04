const { Sequelize } = require('sequelize');
const models = require('../models');
const { camposControleLeitos, leitosDisponiveis } = require('../lib/controleLeitos');
const RegraNegocioErro = require('../lib/erros/RegraNegocioErro');

const { Op } = Sequelize;

const mensagemPerfilNaoExiste = 'Não existe perfil para notificação do leito informado!';

exports.consultarPorNotificaLeito = async (req, res, next) => {
  try {
    const { notificaLeitoId } = req.params;
    const { page = 1, itemsPerPage: limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;
    let where = { notificaLeitoId };
    if (search.trim() !== '') {
      where = {
        [Op.and]: [
          { notificaLeitoId },
          {
            [Op.or]: [
              Sequelize.where(
                Sequelize.fn('upper', Sequelize.col('Perfil.nome')),
                {
                  [Op.like]: `%${search.toUpperCase()}%`,
                },
              ),
              Sequelize.where(
                Sequelize.fn('upper', Sequelize.col('causa')),
                {
                  [Op.like]: `%${search.toUpperCase()}%`,
                },
              ),
            ],
          }],
      };
    }

    const notificaLeitosPerfil = await models.NotificaLeitoPerfil.findAndCountAll({
      where,
      include: models.Perfil,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return res.json({ count: notificaLeitosPerfil.count, data: [...notificaLeitosPerfil.rows] });
  } catch (err) {
    return next(err);
  }
};

exports.consultarPorId = async (req, res) => {
  const { notificaLeitoId, id } = req.params;
  const notificaLeitoPerfil = await models.NotificaLeitoPerfil.findOne({
    where: { id, notificaLeitoId },
    include: [models.Perfil,
      {
        model: models.NotificaLeito,
        include: models.ControleLeito,
      },
      models.ControleLeito, 'LeitosUnidade'],
  });
  if (!notificaLeitoPerfil) return res.status(404).json({ error: mensagemPerfilNaoExiste });
  return res.json({ data: notificaLeitoPerfil });
};

const getNotificaLeito = async (id) => models.NotificaLeito.findOne({
  where: { id },
  include: models.UnidadeSaude,
});

const findOrCreatePerfil = async (nome, transaction) => models.Perfil
  . findOrCreate({ where: { nome }, transaction });

exports.cadastrar = async (req, res, next) => {
  try {
    const { notificaLeitoId } = req.params;
    const notificaLeitoPerfil = req.body;

    const notificaLeito = await getNotificaLeito(notificaLeitoId);
    const leitosUnidade = camposControleLeitos(notificaLeito.UnidadeSaude);
    if (!leitosDisponiveis(notificaLeitoPerfil.ControleLeito, leitosUnidade)) {
      throw new RegraNegocioErro('Não pode ser informado mais leitos do que configurados na Unidade de Saúde.');
    }

    models.sequelize.transaction(async (transaction) => {
      let perfilNome = notificaLeitoPerfil.perfilNome || '';
      perfilNome = perfilNome.trim().toUpperCase();
      if (!notificaLeitoPerfil.perfilId && perfilNome !== '') {
        const [perfil] = await findOrCreatePerfil(perfilNome, transaction);
        notificaLeitoPerfil.perfilId = perfil.id;
      }

      const leitosExistentes = await models.ControleLeito.create(leitosUnidade, { transaction });
      const controleLeito = await models.ControleLeito.create(
        notificaLeitoPerfil.ControleLeito,
        { transaction },
      );
      notificaLeitoPerfil.notificaLeitoId = notificaLeitoId;
      notificaLeitoPerfil.controleLeitoId = controleLeito.id;
      notificaLeitoPerfil.leitosUnidadeId = leitosExistentes.id;
      const leito = await models.NotificaLeitoPerfil.create(notificaLeitoPerfil, { transaction });
      return res.json({
        data: {
          ...leito.toJSON(),
          NotificaLeito: notificaLeito,
          ControleLeito: controleLeito,
          LeitosUnidade: leitosExistentes,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
exports.atualizar = async (req, res, next) => {
  try {
    const { notificaLeitoId, id } = req.params;
    let { perfilId, perfilNome = '' } = req.body;
    const { ControleLeito, causa } = req.body;

    const notificaLeitoPerfil = await models.NotificaLeitoPerfil.findOne({ where: { id } });
    if (!notificaLeitoPerfil) return res.status(404).json({ error: mensagemPerfilNaoExiste });

    const notificaLeito = await getNotificaLeito(notificaLeitoId);
    const leitosUnidade = camposControleLeitos(notificaLeito.UnidadeSaude);

    if (!leitosDisponiveis(ControleLeito, leitosUnidade)) {
      throw new RegraNegocioErro('Não pode ser informado mais leitos do que configurados na Unidade de Saúde.');
    }

    models.sequelize.transaction(async (transaction) => {
      perfilNome = perfilNome.trim().toUpperCase();
      if (!perfilId && perfilNome !== '') {
        const [perfil] = await findOrCreatePerfil(perfilNome, transaction);
        perfilId = perfil.id;
      }
      await models.ControleLeito.update(ControleLeito,
        { where: { id: notificaLeitoPerfil.controleLeitoId } },
        { transaction });

      await models.NotificaLeitoPerfil.update({ causa, perfilId },
        { where: { id, notificaLeitoId } },
        { transaction });
      return res.status(204).send();
    });
  } catch (err) {
    next(err);
  }
};
exports.deletar = async (req, res, next) => {
  try {
    const { notificaLeitoId, id } = req.params;
    const notificaLeitoPerfil = await models.NotificaLeitoPerfil.findOne({ where: { id } });
    if (!notificaLeitoPerfil) return res.status(404).json({ error: mensagemPerfilNaoExiste });
    await models.NotificaLeitoPerfil.destroy({ where: { id, notificaLeitoId } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
