import DateService from '@/services/DateService';

export const locaisList = [
  { key: 'ALTA_ISOLAMENTO_DOMICILIAR', value: 'Isolamento domiciliar' },
  { key: 'INTERNAMENTO_LEITO_COMUM', value: 'Hospitalizado – Leito comum' },
  { key: 'INTERNAMENTO_LEITO_UTI', value: 'Hospitalizado - Leito UTI' },
  { key: 'EVOLUCAO_OBITO', value: 'Evolução para óbito' },
];

export const situacoesList = [
  { key: 'SUSPEITO', value: 'Suspeito' },
  { key: 'CONFIRMADO', value: 'Confirmado' },
  { key: 'DESCARTADO', value: 'Descartado' },
  { key: 'CURADO', value: 'Curado' },
  { key: 'ENCERRADO', value: 'Encerrado' },
  { key: 'OBITO', value: 'Óbito' },
];

export const situacoesQueEncerramFichaList = [
  { key: 'DESCARTADO', value: 'Descartado' },
  { key: 'CURADO', value: 'Curado' },
  { key: 'ENCERRADO', value: 'Encerrado' },
  { key: 'OBITO', value: 'Óbito' },
];

export const situacoesPacienteSuspeitoList = [
  { key: 'CONFIRMADO', value: 'Confirmado' },
  { key: 'ENCERRADO', value: 'Encerrado' },
  { key: 'DESCARTADO', value: 'Descartado' },
];

export const situacoesPacienteConfirmadoList = [
  { key: 'CURADO', value: 'Curado' },
  { key: 'OBITO', value: 'Óbito' },
];

const findItem = (list, value) => {
  const result = list.find((i) => i.key === value);
  if (result) return result.value;
  return value;
};

export default class NotificacaoEvolucao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.notificacaoId = data.notificacaoId || '';
    this.dataHoraAtualizacao = data.dtEvolucao || '';
    this.createdAt = data.createdAt || '';
    this.dtfechamento = data.dtfechamento || null;
    this.local = data.tpLocal || '';
    this.situacao = data.tpEvolucao || '';
  }

  toRequestBody() {
    return {
      ...this,
      dataHoraAtualizacao: DateService.formatDateTypeToStringTypeWithMinutes(this.dataHoraAtualizacao),
      createdAt: DateService.formatDateTypeToStringTypeWithMinutes(this.createdAt),
      dtfechamento: DateService.formatDateTypeToStringTypeWithMinutes(this.dtfechamento),
      local: findItem(locaisList, this.local),
      situacao: findItem(situacoesList, this.situacao),
    };
  }

  toRequest() {
    return {
      notificacaoId: this.notificacaoId,
      dtEvolucao: DateService.toMomentObject(this.dataHoraAtualizacao, 'DD/MM/YYYY HH:mm').toISOString(),
      createdAt: DateService.toMomentObject(this.createdAt, 'DD/MM/YYYY HH:mm').toISOString(),
      dtfechamento: DateService.toMomentObject(this.dtfechamento, 'DD/MM/YYYY HH:mm').toISOString(),
      tpLocal: this.local,
      tpEvolucao: this.situacao,
    };
  }
}
