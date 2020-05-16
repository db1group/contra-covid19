const getDatabaseType = (queryInterface) => queryInterface.sequelize.options.dialect;

exports.getDatabaseType = (queryInterface) => getDatabaseType(queryInterface);

exports.isPostgres = (queryInterface) => getDatabaseType(queryInterface) === 'postgres';
