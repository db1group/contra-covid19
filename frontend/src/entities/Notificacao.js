import DateService from '@/services/DateService';
import Pessoa from './Pessoa';
import Sintomas from './Sintomas';
import Comorbidades from './Comorbidades';
import ExamesImagem from './ExamesImagem';
import InformacoesComplementares from './InformacoesComplementares';
import VinculoEpidemiologico from './VinculoEpidemiologico';
import ConclusaoAtendimento from './ConclusaoAtendimento';
import Hospitalizacao from './Hospitalizacao';
import FrequentouCnes from './FrequentouCnes';

export default class Notificacao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.status = data.status || 'ABERTA';
    this.dataHoraNotificacao = DateService.changeISOFormat(
      data.dataHoraNotificacao,
      'DD/MM/YYYY HH:mm',
    ) || DateService.formatNowAsStringDateTime();
    this.unidadeSaudeId = data.unidadeSaudeId || null;
    this.unidadeSaudeIdSalva = data.unidadeSaudeId || null;
    this.notificadorId = data.notificadorId || 'ac3227a1-8a09-4b5f-93cd-d6ca43b637a4';
    this.sintomatico = data.sintomatico || false;
    this.realizouExamesImagem = data.realizouExamesImagem || false;
    this.dataInicioDosSintomas = DateService.changeFormat(
      data.dataInicioDosSintomas,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.userId = data.userId || '2e439917-3f2a-45b2-9143-aac3bea760d6';
    this.nomeNotificador = data.nomeNotificador || '';
    this.profissaoId = data.profissaoId || null;
    this.tipoDeContatoComCaso = data.tipoDeContatoComCaso || null;
    this.tipoDeLocalDoCaso = data.tipoDeLocalDoCaso || null;
    this.nomeDoCaso = data.nomeDoCaso || '';
    this.descricaoLocal = data.descricaoLocal || '';
    this.observacoes = data.observacoes || '';
    this.suspeito = new Pessoa(data.suspeito || {});
    this.sintomas = new Sintomas(data.sintomas || {});
    this.comorbidades = new Comorbidades(data.comorbidades || {});
    this.examesImagem = new ExamesImagem(data.examesImagem || {});
    this.informacaoComplementar = new InformacoesComplementares(data.informacaoComplementar || {});
    this.vinculoEpidemiologico = new VinculoEpidemiologico(data.vinculoEpidemiologico || {});
    this.conclusaoAtendimento = new ConclusaoAtendimento(data.conclusaoAtendimento || {});
    this.unidadeSaudeNome = data.unidadeSaudeNome || '';
    this.possuiFechamento = data.possuiFechamento || false;
    this.hospitalizacao = new Hospitalizacao(data.hospitalizacao || {});
    this.frequentouCnes = new FrequentouCnes(data.frequentouCnes || {});
  }

  toRequestBody() {
    const notificacao = {
      ...this,
      dataInicioDosSintomas: DateService.changeFormat(this.dataInicioDosSintomas, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataHoraNotificacao: DateService.toMomentObject(this.dataHoraNotificacao, 'DD/MM/YYYY HH:mm').toISOString(),
      suspeito: this.suspeito.toRequestBody(),
      informacaoComplementar: this.informacaoComplementar.toRequestBody(),
      conclusaoAtendimento: this.conclusaoAtendimento.toRequestBody(),
      comorbidades: this.comorbidades.toRequestBody(),
      sintomas: this.sintomas.toRequestBody(),
      hospitalizacao: this.hospitalizacao.toRequestBody(),
      frequentouCnes: this.frequentouCnes.toRequestBody(),
    };

    delete notificacao.id;
    delete notificacao.status;
    delete notificacao.unidadeSaudeNome;
    delete notificacao.examesImagem.realizouOutroRaioTorax;
    delete notificacao.examesImagem.realizouOutraTomografiaTorax;
    delete notificacao.suspeito.bairroNome;
    delete notificacao.suspeito.municipioNome;
    delete notificacao.possuiFechamento;
    delete notificacao.unidadeSaudeIdSalva;
    return notificacao;
  }
}
