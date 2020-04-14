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
    this.unidadeSaudeId = data.unidadeSaudeId || 'chico';
    this.notificadorId = data.notificadorId || 'chico';
    this.sintomatico = data.sintomatico || false;
    this.dataInicioDosSintomas = data.dataInicioDosSintomas || '';
    this.userId = data.userId || 'chico';
    this.observacoes = data.observacoes || '';
    this.suspeito = new Pessoa(data.suspeito || {});
    this.sintomas = new Sintomas(data.sintomas || {});
    this.comorbidades = new Comorbidades(data.comorbidades || {});
    this.informacaoComplementar = new InformacoesComplementares(data.informacaoComplementar || {});
    this.vinculoEpidemiologico = new VinculoEpidemiologico(data.vinculoEpidemiologico || {});
    this.conclusaoAtendimento = new ConclusaoAtendimento(data.conclusaoAtendimento || {});
  }
}
