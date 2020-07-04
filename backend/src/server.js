const server = require('./app');
const { tratarErrorsRetornoAPI } = require('./lib/erros/api-error-handling');

const port = process.env.PORT || 3000;

server.use((err, req, res, _) => {
  tratarErrorsRetornoAPI(res, err);
});
server.listen(port, () => console.info(`Running on port ${port}`));

process.on('uncaughtException', (err) => {
  console.error('Ocorreu um erro não tratado:', err);
  process.exit(1);
});
