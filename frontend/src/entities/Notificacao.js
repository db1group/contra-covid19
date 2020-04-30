import DateService from '@/services/DateService';
import Pessoa from './Pessoa';
import Sintomas from './Sintomas';
import Comorbidades from './Comorbidades';
import ExamesImagem from './ExamesImagem';
import InformacoesComplementares from './InformacoesComplementares';
import VinculoEpidemiologico from './VinculoEpidemiologico';
import ConclusaoAtendimento from './ConclusaoAtendimento';

const getDateToView = (date) => {
  if (!date) return date;
  return DateService.changeFormat(date, 'YYYY-MM-DD', 'DD/MM/YYYY');
};

export default class Notificacao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.status = data.status || 'ABERTA';
    this.dataHoraNotificacao = data.dataHoraNotificacao || DateService.formatNowAsStringDateTime();
    this.unidadeSaudeId = data.unidadeSaudeId || null;
    this.notificadorId = data.notificadorId || 'ac3227a1-8a09-4b5f-93cd-d6ca43b637a4';
    this.sintomatico = data.sintomatico || false;
    this.realizouExamesImagem = data.realizouExamesImagem || false;
    this.dataInicioDosSintomas = data.dataInicioDosSintomas || '';
    this.userId = data.userId || '2e439917-3f2a-45b2-9143-aac3bea760d6';
    this.nomeNotificador = data.nomeNotificador || '';
    this.profissaoId = data.profissaoId || null;
    this.tipoDeContatoComCaso = data.tipoDeContatoComCaso || null;
    this.tipoDeLocalDoCaso = data.tipoDeLocalDoCaso || null;
    this.nomeDoCaso = data.nomeDoCaso || '';
    this.observacoes = data.observacoes || '';
    this.suspeito = new Pessoa(data.suspeito || {});
    this.sintomas = new Sintomas(data.sintomas || {});
    this.comorbidades = new Comorbidades(data.comorbidades || {});
    this.examesImagem = new ExamesImagem(data.examesImagem || {});
    this.informacaoComplementar = new InformacoesComplementares(data.informacaoComplementar || {});
    this.vinculoEpidemiologico = new VinculoEpidemiologico(data.vinculoEpidemiologico || {});
    this.conclusaoAtendimento = new ConclusaoAtendimento(data.conclusaoAtendimento || {});
    this.unidadeSaudeNome = data.unidadeSaudeNome || '';
  }

  toRequestBody() {
    const notificacao = {
      ...this,
      dataInicioDosSintomas: DateService.changeFormat(this.dataInicioDosSintomas, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataHoraNotificacao: DateService.toMomentObject(this.dataHoraNotificacao, 'DD/MM/YYYY HH:mm').toISOString(),
      suspeito: this.suspeito.toRequestBody(),
      informacaoComplementar: this.informacaoComplementar.toRequestBody(),
      conclusaoAtendimento: this.conclusaoAtendimento.toRequestBody(),
    };

    delete notificacao.id;
    delete notificacao.status;
    delete notificacao.unidadeSaudeNome;
    delete notificacao.examesImagem.realizouOutroRaioTorax;
    delete notificacao.examesImagem.realizouOutraTomografiaTorax;
    delete notificacao.suspeito.bairroNome;
    delete notificacao.suspeito.municipioNome;
    return notificacao;
  }

  toView() {
    this.dataInicioDosSintomas = getDateToView(this.dataInicioDosSintomas);
    this.dataHoraNotificacao = getDateToView(this.dataHoraNotificacao);
    this.suspeito.dataDeNascimento = getDateToView(this.suspeito.dataDeNascimento);
    this.conclusaoAtendimento.dataDaColeta = getDateToView(this.conclusaoAtendimento.dataDaColeta);
    this.informacaoComplementar.dataDaViagem = getDateToView(this.informacaoComplementar.dataDaViagem);
    return this;
  }
}
