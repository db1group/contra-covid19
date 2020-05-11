const models = require('../models');

exports.atualizar = async (pessoa) => {
  const { id } = pessoa;
  await models.Pessoa.update(
    { pessoa },
    { where: { id } },
  );
};
