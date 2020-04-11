const models = require("../models");

exports.index = async (req, res) => {
  const users = await models.User.findAll();
  return res.json(users);
};

exports.create = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = await models.User.create({ firstName, lastName, email });
  return res.json(user);
};

exports.get = async (req, res) => {
  const id = req.params.id;
  const user = await models.User.findOne({
    where: { id },
  });
  if (user === null) return res.status(404).json({ error: "User not found!" });
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
  const id = req.params.id;
  await models.User.destroy({
    where: { id },
  });
  return res.status(204).send();
};
