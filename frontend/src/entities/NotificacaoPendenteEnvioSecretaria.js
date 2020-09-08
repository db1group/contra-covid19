export default class NotificacaoPendenteEnvioSecretaria {
  constructor(data = {}) {
    this.notificacaoId = data.notificacaoId || null;
    this.nomePaciente = data.nomePaciente || '';
    this.nomeUnidadeSaude = data.nomeUnidadeSaude || '';
    this.numeroDocumento = data.numeroDocumento || '';
    this.tipoDocumento = data.tipoDocumento || '';
    this.tpTransmissao = data.tpTransmissao === 'PENDENTE_ENVIO' ? 'ENVIO' : 'ATUALIZAÇÃO';
  }
}
