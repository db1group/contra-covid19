const excel = require('excel4node');
const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const TIME_ZONE = {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  AMERICA_SAO_PAULO: 'America/Sao_Paulo',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
exports.gerarExcel = async (colunas, lista, res) => {
  try {
    const diretorio = 'excel';
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio);
    }

    const guid = uuid();
    const nomeArquivo = `${diretorio}/${guid}.xlsx`;
    const fullPath = path.resolve(nomeArquivo);

    const wb = new excel.Workbook();
    const ws = wb.addWorksheet('Planilha1');

    if ((!lista || lista.length <= 0) && (!colunas || colunas.length <= 0)) {
      wb.write(fullPath, res);
      return;
    }

    const colunasTemp = colunas && colunas.length > 0 ? colunas : [];
    if (!colunasTemp || colunasTemp.length <= 0) {
      const element = lista[0];

      const keys = Object.keys(element);
      keys.forEach((key) => {
        colunasTemp.push({
          nomeColuna: key,
          nomeCampo: key,
        });
      });
    }

    for (let index = 0; index < colunasTemp.length; index += 1) {
      const element = colunasTemp[index];
      ws.cell(1, index + 1).string(element.nomeColuna);
    }

    for (let index = 0; index < lista.length; index += 1) {
      const item = lista[index];

      for (let indice = 0; indice < colunasTemp.length; indice += 1) {
        const nomeDoCampo = colunasTemp[indice].nomeCampo;

        if (Object.prototype.hasOwnProperty.call(item, nomeDoCampo)) {
          const value = item[nomeDoCampo];
          if (typeof value === 'number') {
            ws.cell(index + 2, indice + 1).number(value);
          }

          if (typeof value === 'string') {
            ws.cell(index + 2, indice + 1).string(value);
          }

          if (typeof value === 'boolean') {
            ws.cell(index + 2, indice + 1).bool(value);
          }

          if (value instanceof Date) {
            ws.cell(index + 2, indice + 1).date(value).style({ numberFormat: 'dd/mm/yyyy hh:MM:ss' });
          }
        }
      }
    }

    wb.write(fullPath, res);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

this.criarDataInicialParaFiltro = (data) => moment
  .tz(data, TIME_ZONE.AMERICA_SAO_PAULO).toISOString();

this.criarDataFinalParaFiltro = (data) => moment
  .tz(data, TIME_ZONE.AMERICA_SAO_PAULO).endOf('day').toISOString();

this.retornarCampo = (objeto, nomeDaPropriedade) => {
  if (!this.validarCampo(objeto, nomeDaPropriedade)) {
    return null;
  }

  return objeto[nomeDaPropriedade];
};

this.validarCampo = (objeto, nomeDaPropriedade) => {
  if (!objeto) {
    return false;
  }

  const objetoTemp = Object.prototype.hasOwnProperty.call(objeto, 'dataValues') ? objeto.dataValues : objeto;
  return Object.prototype.hasOwnProperty.call(objetoTemp, nomeDaPropriedade);
};

exports.retornarHoraDaData = (objeto, nomeDaPropriedade) => {
  if (!this.validarCampo(objeto, nomeDaPropriedade)) {
    return null;
  }

  const data = objeto[nomeDaPropriedade];
  if (!data) {
    return null;
  }

  return moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('HH:mm');
};

exports.retornarDataSemHora = (objeto, nomeDaPropriedade) => {
  if (!this.validarCampo(objeto, nomeDaPropriedade)) {
    return null;
  }

  const data = objeto[nomeDaPropriedade];
  if (!data) {
    return null;
  }

  return moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('DD/MM/YYYY');
};

exports.preencherCampoBoolean = (objeto, nomeDaPropriedade) => {
  if (!this.validarCampo(objeto, nomeDaPropriedade)) {
    return null;
  }

  const valorDaPropriedade = objeto[nomeDaPropriedade];
  if (typeof valorDaPropriedade !== 'boolean') {
    return null;
  }

  return valorDaPropriedade ? 'Sim' : 'Não';
};
