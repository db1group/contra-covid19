const uuid = require('uuid/v4');
const models = require('../models');

exports.index = async (req, res) => {
  const users = await models.User.findAll();
  return res.json(users);
};

exports.create = async (req, res) => {
  const { email } = req.body;
  const user = await models.User.create({ id: uuid(), email });
  return res.json(user);
};

exports.get = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({
    where: { id },
  });
  if (user === null) return res.status(404).json({ error: 'User not found!' });
  return res.json(user);
};

exports.update = async (req, res) => {
  const { id, ...userParams } = req.body;
  await models.User.update(userParams, {
    where: { id },
  });
  return res.status(204).send();
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await models.User.destroy({
    where: { id },
  });
  return res.status(204).send();
};
