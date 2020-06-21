module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('UnidadeSaude', 'qtEnfermariaCovid', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTIAdultaCovid', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTIPedCovid', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTINeoCovid', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtEnfermariaNormal', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTIPedNormal', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTINeoNormal', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtEnfermariaPrivado', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTIAdultaPrivado', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTIPedPrivado', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTINeoPrivado', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
    queryInterface.addColumn('UnidadeSaude', 'qtUTIAdultaNormal', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      transaction: t,
    }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('UnidadeSaude', 'qtEnfermariaCovid', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTIAdultaCovid', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTIPedCovid', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTINeoCovid', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtEnfermariaNormal', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTIAdultaNormal', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTIPedNormal', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTINeoNormal', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtEnfermariaPrivado', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTIAdultaPrivado', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTIPedPrivado', { transaction: t }),
    queryInterface.removeColumn('UnidadeSaude', 'qtUTINeoPrivado', { transaction: t }),
  ])),
};
