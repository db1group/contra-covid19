const repos = require('../repositories/repository-factory');

exports.obterTaxasPorDataFechamento = async (req, res) => {
  const { dataFechamento } = req.params;
  const taxa = await repos.taxaRepository.findByDataFechamento(dataFechamento);
  if (taxa) return res.json({ taxa });
  return res.status(404).json({ error: 'Não há taxas cadastradas para o fechamento!' });
};

exports.salvar = async (req, res) => {
  const taxaRequest = req.body;
  const taxa = await repos.taxaRepository.findByDataFechamento(taxaRequest.dtfechamento);
  if (taxa) return res.status(409).json({ error: 'Já existem taxas cadastradas para o fechamento!' });
  const saved = await repos.taxaRepository.salvar(taxaRequest);
  return res.json({ taxa: saved });
};

exports.update = async (req, res) => {
  const taxaRequest = req.body;
  const updated = await repos.taxaRepository.update(taxaRequest);
  return res.json({ taxa: updated });
};
