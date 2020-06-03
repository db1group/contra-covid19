const fs = require('fs');
const path = require('path');
const { normalizarTexto } = require('../../lib/normalizar-texto');

const query = (queryInterface, sql, transaction) => queryInterface
  .sequelize
  .query(sql, { raw: true }, { transaction });

const scriptPath = path.resolve(__dirname, '../scripts');
const municipiosCSV = fs.readFileSync(path.resolve(scriptPath, 'municipios_ibge.csv'), 'utf8');

module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(async (t) => {
    await query(queryInterface, `UPDATE "Municipio" SET  "ufIBGE" = '11' WHERE uf = 'RO';
    UPDATE "Municipio" SET  "ufIBGE" = '12' WHERE uf = 'AC';
    UPDATE "Municipio" SET  "ufIBGE" = '13' WHERE uf = 'AM';
    UPDATE "Municipio" SET  "ufIBGE" = '14' WHERE uf = 'RR';
    UPDATE "Municipio" SET  "ufIBGE" = '15' WHERE uf = 'PA';
    UPDATE "Municipio" SET  "ufIBGE" = '16' WHERE uf = 'AP';
    UPDATE "Municipio" SET  "ufIBGE" = '17' WHERE uf = 'TO';
    UPDATE "Municipio" SET  "ufIBGE" = '21' WHERE uf = 'MA';
    UPDATE "Municipio" SET  "ufIBGE" = '22' WHERE uf = 'PI';
    UPDATE "Municipio" SET  "ufIBGE" = '23' WHERE uf = 'CE';
    UPDATE "Municipio" SET  "ufIBGE" = '24' WHERE uf = 'RN';
    UPDATE "Municipio" SET  "ufIBGE" = '25' WHERE uf = 'PB';
    UPDATE "Municipio" SET  "ufIBGE" = '26' WHERE uf = 'PE';
    UPDATE "Municipio" SET  "ufIBGE" = '27' WHERE uf = 'AL';
    UPDATE "Municipio" SET  "ufIBGE" = '28' WHERE uf = 'SE';
    UPDATE "Municipio" SET  "ufIBGE" = '29' WHERE uf = 'BA';
    UPDATE "Municipio" SET  "ufIBGE" = '31' WHERE uf = 'MG';
    UPDATE "Municipio" SET  "ufIBGE" = '32' WHERE uf = 'ES';
    UPDATE "Municipio" SET  "ufIBGE" = '33' WHERE uf = 'RJ';
    UPDATE "Municipio" SET  "ufIBGE" = '35' WHERE uf = 'SP';
    UPDATE "Municipio" SET  "ufIBGE" = '41' WHERE uf = 'PR';
    UPDATE "Municipio" SET  "ufIBGE" = '42' WHERE uf = 'SC';
    UPDATE "Municipio" SET  "ufIBGE" = '43' WHERE uf = 'RS';
    UPDATE "Municipio" SET  "ufIBGE" = '50' WHERE uf = 'MS';
    UPDATE "Municipio" SET  "ufIBGE" = '51' WHERE uf = 'MT';
    UPDATE "Municipio" SET  "ufIBGE" = '52' WHERE uf = 'GO';
    UPDATE "Municipio" SET  "ufIBGE" = '53' WHERE uf = 'DF';`, t);

    const municipios = municipiosCSV.replace(/\n^$/m, '').split('\n').map((line) => line.split(','));
    return Promise.all[municipios.map(([ibge, nome]) => {
      const nomeNormalizado = normalizarTexto(nome).replace('\'', ' ');
      return query(queryInterface,
        `UPDATE "Municipio" SET "residenciaIBGE" = '${ibge}' WHERE nome = '${nomeNormalizado}';`,
        t);
    })];
  }),

  down: (queryInterface, Sequelize) => queryInterface
    .sequelize
    .query('UPDATE "Municipio" SET  "ufIBGE" = NULL, residenciaIBGE = NULL;', { type: Sequelize.QueryTypes.UPDATE }),
};
