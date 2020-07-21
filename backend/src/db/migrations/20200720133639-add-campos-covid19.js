module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'cloroquina', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'doencaPulmonar', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'perdaOlfatoPaladar', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'hospitalizado', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'cnesHospitalId', {
        type: Sequelize.UUID,
        references: {
          model: 'UnidadeSaude',
          key: 'id',
        },
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'internacaoSus', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'tipoLeito', {
        type: Sequelize.STRING(10),
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataInternamento', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataIsolamento', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataAlta', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'codigoExame', {
        type: Sequelize.STRING(18),
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'exameId', {
        type: Sequelize.UUID,
        references: {
          model: 'Exame',
          key: 'id',
        },
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'requisicao', {
        type: Sequelize.STRING(18),
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'resultadoExameId', {
        type: Sequelize.UUID,
        references: {
          model: 'ResultadoExame',
          key: 'id',
        },
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataCadastroExame', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataRecebimentoExame', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataLiberacaoExame', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'labAmostraId', {
        type: Sequelize.UUID,
        references: {
          model: 'UnidadeSaude',
          key: 'id',
        },
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'pesquisaGal', {
        type: Sequelize.STRING(18),
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'numeroDo', {
        type: Sequelize.STRING(18),
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'frequentouUnidade', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'unidadeFrequentadaId', {
        type: Sequelize.UUID,
        references: {
          model: 'UnidadeSaude',
          key: 'id',
        },
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'descritivoViagem', {
        type: Sequelize.STRING,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataRetornoLocal', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataChegadaBrasil', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'dataChegadaUF', {
        type: Sequelize.DATEONLY,
        transaction,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'descricaoLocal', {
        type: Sequelize.STRING(255),
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('NotificacaoCovid19', 'cloroquina', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'doencaPulmonar', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'perdaOlfatoPaladar', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'hospitalizado', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'cnesHospitalId', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'internacaoSus', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tipoLeito', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataInternamento', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataIsolamento', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataAlta', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'codigoExame', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'exameId', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'requisicao', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'resultadoExameId', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataCadastroExame', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataRecebimentoExame', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataLiberacaoExame', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'labEnvioAmostra', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'pesquisaGal', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'numeroDo', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'frequentouUnidade', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'unidadeFrequentadaId', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'descritivoViagem', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataRetornoLocal', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataChegadaBrasil', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataChegadaUF', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'descricaoLocal', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
