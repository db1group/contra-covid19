const models = require('../models');

exports.getPorEmail = async (email) => models.User.findOne({
  where: { email },
});
