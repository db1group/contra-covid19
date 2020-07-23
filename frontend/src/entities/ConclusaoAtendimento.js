import DateService from '@/services/DateService';

export default class ConclusaoAtendimento {
  constructor(data = {}) {
    this.situacaoNoMomentoDaNotificacao = data.situacaoNoMomentoDaNotificacao || null;
    this.coletaMaterialParaDiagnostico = data.coletaMaterialParaDiagnostico || false;
    this.tipoLaboratorio = data.tipoLaboratorio || null;
    this.nomeLaboratorioEnvioMaterial = data.nomeLaboratorioEnvioMaterial || '';
    this.dataDaColeta = DateService.changeFormat(
      data.dataDaColeta,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.metodoDeExame = data.metodoDeExame || null;
    this.dataCadastroExame = DateService.changeFormat(
      data.dataCadastroExame,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataRecebimentoExame = DateService.changeFormat(
      data.dataRecebimentoExame,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataLiberacaoExame = DateService.changeFormat(
      data.dataLiberacaoExame,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.codigoExame = data.codigoExame || '';
    this.requisicao = data.requisicao || '';
    this.exameId = data.exameId || null;
    this.nomeExame = data.nomeExame || '';
    this.resultadoExameId = data.resultadoExameId || null;
    this.nomeResultado = data.nomeResultado || '';
    this.labAmostraId = data.labAmostraId || null;
    this.nomeLabAmostra = data.nomeLabAmostra || '';
    this.pesquisaGal = data.pesquisaGal || '';
  }

  toRequestBody() {
    const {
      nomeExame,
      nomeResultado,
      nomeLabAmostra,
      ...conclusao
    } = this;
    return {
      ...conclusao,
      dataDaColeta: DateService.changeFormat(this.dataDaColeta, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataCadastroExame: DateService.changeFormat(this.dataCadastroExame, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataRecebimentoExame: DateService.changeFormat(this.dataRecebimentoExame, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataLiberacaoExame: DateService.changeFormat(this.dataLiberacaoExame, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
