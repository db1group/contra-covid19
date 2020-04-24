import Utils from '@/services/Utils';
import DateService from '@/services/DateService';

export default class NotificacaoConsulta {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.documento = data.documento || '';
    this.unidade = data.unidade || '';
    this.dataNotificacao = data.dataNotificacao || '';
    this.telefone = data.telefone || '';
    this.situacao = data.situacao || '';
    this.status = data.status;
  }

  toRequestBody() {
    return {
      ...this,
      documento: Utils.numbersOnly(this.documento),
      dataNotificacao: DateService.changeFormat(this.dataNotificacao, 'YYYY-MM-DDTHH:mm', 'DD/MM/YYYY HH:mm'),
      telefone: Utils.numbersOnly(this.telefone),
    };
  }
}
