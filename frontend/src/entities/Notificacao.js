import Pessoa from './Pessoa';
import Sintomas from './Sintomas';
import Comorbidades from './Comorbidades';
import InformacoesComplementares from './InformacoesComplementares';
import VinculoEpidemiologico from './VinculoEpidemiologico';
import ConclusaoAtendimento from './ConclusaoAtendimento';

export default class {
  constructor(data = {}) {
    return {
      id: data.id || null,
      dataHoraNotificacao: data.dataHoraNotificacao || null,
      unidadeSaudeId: data.unidadeSaudeId || null,
      notificadorId: data.notificadorId || null,
      sintomatico: data.sintomatico || false,
      dataInicioDosSintomas: data.dataInicioDosSintomas || null,
      userId: data.userId || null,
      suspeito: new Pessoa(data.suspeito || {}),
      sintomas: new Sintomas(data.sintomas || {}),
      comorbidades: new Comorbidades(data.comorbidades || {}),
      informacaoComplementar: new InformacoesComplementares(data.informacaoComplementar || {}),
      vinculoEpidemiologico: new VinculoEpidemiologico(data.vinculoEpidemiologico || {}),
      conclusaoAtendimento: new ConclusaoAtendimento(data.conclusaoAtendimento || {}),
    };
  }
};
