const models = require('../models');

exports.getPorEmail = async (email, transaction) => models.User.findOne({
  where: { email },
},
{
  transaction,
});
