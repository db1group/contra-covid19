import DateService from '@/services/DateService';

export default class NotificacaoEvolucao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.dataHoraAtualizacao = data.dtEvolucao || '';
    this.local = data.tpLocal || '';
    this.situacao = data.tpEvolucao || '';
  }

  toRequestBody() {
    return {
      ...this,
      dataHoraAtualizacao: DateService.changeFormat(this.dataHoraAtualizacao, 'YYYY-MM-DDTHH:mm', 'DD/MM/YYYY HH:mm'),
    };
  }
}
