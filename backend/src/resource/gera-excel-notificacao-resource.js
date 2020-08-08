const Excel = require('exceljs');
const fs = require('fs');
const ExportaNotificacaoRepository = require('../repositories/exporta-notificacao-repository');
const Stopwatch = require('../lib/stopwatch');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { RegraNegocioErro } = require('../lib/erros');

const setarColunas = (ws) => {
  // eslint-disable-next-line no-param-reassign
  ws.columns = ExportaNotificacaoRepository.cabecalhosExportacao;
};

const setarNotificacao = (ws, notificacoes) => {
  const rows = ExportaNotificacaoRepository.retornarRowsNotificacaoExcel(notificacoes);
  ws.addRows(rows);
};

exports.gerarExcel = async (req, res, next) => {
  try {
    const sw = new Stopwatch();
    sw.start();
    const [
      dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro,
    ] = ExportaNotificacaoRepository.retornarFiltrosData(req.query);
    const { tenant } = new UsuarioLogado(req);
    const [notificacoes] = await ExportaNotificacaoRepository.consultarNotificacoes(
      dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro,
      tenant,
    );
    if (notificacoes.length === 0) throw new RegraNegocioErro('Não existem notificações neste período.');

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Planilha1');
    setarColunas(ws);
    setarNotificacao(ws, notificacoes);
    const { fullPath } = ExportaNotificacaoRepository.generateFileName('.xls');
    await wb.xlsx.writeFile(fullPath);
    const notificacoesStream = fs.createReadStream(fullPath);
    res.on('finish', () => {
      sw.stop();
      sw.summary();
    });
    notificacoesStream.pipe(res);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
