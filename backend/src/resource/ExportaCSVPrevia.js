const ExportaNotificacaoRepository = require('../repositories/exporta-notificacao-repository');
const ExportaCSV = require('./ExportaCSV');

class ExportaCSVPrevia extends ExportaCSV {
  async retornaRows(notificacoes) {
    return ExportaNotificacaoRepository.retornarRowsNotificacaoExcelPrevia(notificacoes);
  }

  async consultar(dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro,
    dataEvolucaoFinalFiltro, tenant) {
    const [notificacoes] = await ExportaNotificacaoRepository
      .consultarNotificacoesResumoPrevia(dataInicialFiltro, dataFinalFiltro,
        dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro, tenant);
    return notificacoes;
  }

  cabecalhosParaExportacao() {
    return ExportaNotificacaoRepository.cabecalhosExportacaoPrevia;
  }
}

module.exports = ExportaCSVPrevia;
