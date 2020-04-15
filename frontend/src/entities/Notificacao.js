import Pessoa from './Pessoa';
import Sintomas from './Sintomas';
import Comorbidades from './Comorbidades';
import InformacoesComplementares from './InformacoesComplementares';
import VinculoEpidemiologico from './VinculoEpidemiologico';
import ConclusaoAtendimento from './ConclusaoAtendimento';

export default class Notificacao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.dataHoraNotificacao = data.dataHoraNotificacao || null;
    this.unidadeSaudeId = data.unidadeSaudeId || 'ac3227a1-8a09-4b5f-93cd-d6ca43b637a3';
    this.notificadorId = data.notificadorId || 'ac3227a1-8a09-4b5f-93cd-d6ca43b637a4';
    this.sintomatico = data.sintomatico || false;
    this.dataInicioDosSintomas = data.dataInicioDosSintomas || '';
    this.userId = data.userId || '2e439917-3f2a-45b2-9143-aac3bea760d6';
    this.observacoes = data.observacoes || '';
    this.suspeito = new Pessoa(data.suspeito || {});
    this.sintomas = new Sintomas(data.sintomas || {});
    this.comorbidades = new Comorbidades(data.comorbidades || {});
    this.informacaoComplementar = new InformacoesComplementares(data.informacaoComplementar || {});
    this.vinculoEpidemiologico = new VinculoEpidemiologico(data.vinculoEpidemiologico || {});
    this.conclusaoAtendimento = new ConclusaoAtendimento(data.conclusaoAtendimento || {});
  }
}
