const { Readable } = require('stream');
const ExportaNotificacaoRepository = require('../repositories/exporta-notificacao-repository');
const Stopwatch = require('../lib/stopwatch');
const { UsuarioLogado } = require('../secure/usuario-logado');
const ExportaCSVPrevia = require('./ExportaCSVPrevia');
const ExportaCSV = require('./ExportaCSV');

const createReadableStream = (notificacoes) => new Readable({
  objectMode: true,
  read() {
    [...notificacoes, null].map((n) => this.push(n));
  },
});

exports.exportarNotificacoes = async (req, res, next) => {
  try {
    const sw = new Stopwatch();
    sw.start();
    const [
      dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro,
    ] = ExportaNotificacaoRepository.retornarFiltrosData(req.query);
    const { tenant } = new UsuarioLogado(req);
    const { previa } = req.query;
    const exportador = previa === 'SIM' ? new ExportaCSVPrevia() : new ExportaCSV();
    const rows = await exportador.fetchRows(dataInicialFiltro, dataFinalFiltro,
      dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro, tenant);
    const notificacoesStream = createReadableStream(rows);
    res.on('finish', () => {
      sw.stop();
      sw.summary();
    });
    notificacoesStream.pipe(exportador.transformaCSV()).pipe(res);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
