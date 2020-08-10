const models = require('../models');

exports.getByTenant = async (tenant) => models.Municipio.findOne({
  where: { id: tenant },
});
