import DateService from '@/services/DateService';

export default class NotificacaoConsulta {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.documento = data.documento || '';
    this.unidade = data.unidade || '';
    this.dataNotificacao = DateService.formatDateTypeToStringTypeWithMinutes(data.dataNotificacao) || '';
    this.telefone = data.telefone || '';
    this.situacao = data.situacao || '';
    this.status = data.status || 'ABERTA';
    this.createdAt = data.createdAt || '';
  }
}
