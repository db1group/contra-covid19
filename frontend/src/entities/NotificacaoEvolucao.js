import DateService from '@/services/DateService';

export const locaisList = [
  { key: 'ALTA_ISOLAMENTO_DOMICILIAR', value: 'Alta com isolamento domiciliar' },
  { key: 'INTERNAMENTO_LEITO_COMUM', value: 'Hospitalizado – Leito comum' },
  { key: 'INTERNAMENTO_LEITO_UTI', value: 'Hospitalizado - Leito UTI' },
];

export const situacoesList = [
  { key: 'SUSPEITO', value: 'Suspeito' },
  { key: 'CONFIRMADO', value: 'Confirmado' },
  { key: 'DESCARTADO', value: 'Descartado' },
  { key: 'CURA', value: 'Curado' },
  { key: 'ENCERRADO', value: 'Encerrado' },
  { key: 'OBITO', value: 'Óbito' },
];

export const situacoesQueNaoEncerramFichaList = [
  'SUSPEITO',
  'CONFIRMADO',
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
    this.local = data.tpLocal || '';
    this.situacao = data.tpEvolucao || '';
  }

  toRequestBody() {
    return {
      ...this,
      dataHoraAtualizacao: DateService.parseZone(
        this.dataHoraAtualizacao,
        'YYYY-MM-DDTHH:mm:ss.SSSZ',
        'DD/MM/YYYY HH:mm',
      ),
      local: findItem(locaisList, this.local),
      situacao: findItem(situacoesList, this.situacao),
    };
  }

  toRequest() {
    return {
      notificacaoId: this.notificacaoId,
      dtEvolucao: DateService.toMomentZoneObject(this.dataHoraAtualizacao, 'DD/MM/YYYY HH:mm').toISOString(),
      tpLocal: this.local,
      tpEvolucao: this.situacao,
    };
  }
}
