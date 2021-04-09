const { Transform } = require('stream');
const ExportaNotificacaoRepository = require('../repositories/exporta-notificacao-repository');
const { RegraNegocioErro } = require('../lib/erros');

class ExportaCSV {
  async fetchRows(
    dataInicialFiltro,
    dataFinalFiltro,
    dataEvolucaoInicialFiltro,
    dataEvolucaoFinalFiltro,
    tenant,
  ) {
    const notificacoes = await this._consultarNotificacoes(
      dataInicialFiltro,
      dataFinalFiltro,
      dataEvolucaoInicialFiltro,
      dataEvolucaoFinalFiltro,
      tenant,
    );
    this._validaNotificacoes(notificacoes);
    return this.retornaRows(notificacoes);
  }

  async retornaRows(notificacoes) {
    return ExportaNotificacaoRepository.retornarRowsNotificacaoExcel(notificacoes);
  }

  async _consultarNotificacoes(
    dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro, tenant,
  ) {
    return this.consultar(dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro,
      dataEvolucaoFinalFiltro, tenant);
  }

  async consultar(dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro,
    dataEvolucaoFinalFiltro, tenant) {
    const [notificacoes] = await ExportaNotificacaoRepository.consultarNotificacoes(
      dataInicialFiltro,
      dataFinalFiltro,
      dataEvolucaoInicialFiltro,
      dataEvolucaoFinalFiltro,
      tenant,
    );
    return notificacoes;
  }

  _validaNotificacoes(notificacoes) {
    if (notificacoes.length === 0) throw new RegraNegocioErro('Não existem notificações neste período.');
  }

  cabecalhosParaExportacao() {
    return ExportaNotificacaoRepository.cabecalhosExportacao;
  }

  transformaCSV() {
    const $this = this;
    let headerSeted = false;
    return new Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform(chunk, _encoding, callback) {
        let data = '';
        if (!headerSeted) {
          const cabecalhos = $this.cabecalhosParaExportacao().map((n) => n.header).join(',');
          data += `${cabecalhos}\n`;
          headerSeted = true;
        }
        const dataCSV = Object.entries(chunk)
          .map(([_, value]) => (value
            ? `"${value.toString().replace(/"/g, '\'')}"`
            : ''))
          .join(',');

        data += `${dataCSV}\n`;
        callback(null, data);
      },
    });
  }
}

module.exports = ExportaCSV;
