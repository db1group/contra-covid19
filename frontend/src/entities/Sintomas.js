export default class {
  constructor(data = {}) {
    return {
      coriza: data.coriza || false,
      tosseSeca: data.tosseSeca || false,
      dorDeGarganta: data.dorDeGarganta || false,
      mialgia: data.mialgia || false,
      tosseProdutiva: data.tosseProdutiva || false,
      sibilo: data.sibilo || false,
      desconfortoRespiratorio: data.desconfortoRespiratorio || false,
      dispneia: data.dispneia || false,
      taquipneia: data.taquipneia || false,
      saturacaoDeOximetriaDePulso: data.saturacaoDeOximetriaDePulso || false,
      cianoseCentral: data.cianoseCentral || false,
      diminuicaoDePulsoPeriferico: data.diminuicaoDePulsoPeriferico || false,
      hipotensao: data.hipotensao || false,
      diarreia: data.diarreia || false,
      cefaleia: data.cefaleia || false,
      nausea: data.nausea || false,
      vomito: data.vomito || false,
      outros: data.outros || '',
    };
  }
};
