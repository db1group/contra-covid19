<template>
  <section>
    <h3 class="primary--text my-7 display-1 text-center">
      Cadastro de notificação
    </h3>
    <base-page>
      <identificacao-caso/>
      <sinais-e-sintomas
        :sintomatico="notificacao.sintomatico"
        :data-inicio-dos-sintomas="notificacao.dataInicioDosSintomas"
        :sintomas="notificacao.sintomas"
        @update:sintomatico="updateSintomatico"
        @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
        @update:sintomaCoriza="updateSintoma('coriza', $event)"
        @update:sintomaTosseSeca="updateSintoma('tosseSeca', $event)"
        @update:sintomaDorDeGarganta="updateSintoma('dorDeGarganta', $event)"
        @update:sintomaMialgia="updateSintoma('mialgia', $event)"
        @update:tosseProdutiva="updateSintoma('tosseProdutiva', $event)"
        @update:sibilo="updateSintoma('sibilo', $event)"
        @update:desconfortoRespiratorio="updateSintoma('desconfortoRespiratorio', $event)"
        @update:dispneia="updateSintoma('dispneia', $event)"
        @update:taquipneia="updateSintoma('taquipneia', $event)"
        @update:saturacaoDeOximetriaDePulso="updateSintoma('saturacaoDeOximetriaDePulso', $event)"
        @update:cianoseCentral="updateSintoma('cianoseCentral', $event)"
        @update:diminuicaoDePulsoPeriferico="updateSintoma('diminuicaoDePulsoPeriferico', $event)"
        @update:hipotensao="updateSintoma('hipotensao', $event)"
        @update:diarreia="updateSintoma('diarreia', $event)"
        @update:cefaleia="updateSintoma('cefaleia', $event)"
        @update:nausea="updateSintoma('nausea', $event)"
        @update:vomito="updateSintoma('vomito', $event)"
        @update:outrosSintomas="updateSintoma('outros', $event)"
      />
      <comorbidades
        :comorbidades="notificacao.comorbidades"
        @update:puerperaAte45DiasDoParto="updateComorbidade('puerperaAte45DiasDoParto', $event)"
        @update:doencaNeurologicaCronica="updateComorbidade('doencaNeurologicaCronica', $event)"
        @update:sindromeDeDown="updateComorbidade('sindromeDeDown', $event)"
        @update:doencaRenalCronica="updateComorbidade('doencaRenalCronica', $event)"
        @update:diabetesMellitus="updateComorbidade('diabetesMellitus', $event)"
        @update:doencaHematologicaCronica="updateComorbidade('doencaHematologicaCronica', $event)"
        @update:imunodeficiencia="updateComorbidade('imunodeficiencia', $event)"
        @update:asma="updateComorbidade('asma', $event)"
        @update:doencaCardioVascularCronica="updateComorbidade('doencaCardioVascularCronica', $event)"
        @update:outraPneumopatiaCronica="updateComorbidade('outraPneumopatiaCronica', $event)"
        @update:doencaHepaticaCronica="updateComorbidade('doencaHepaticaCronica', $event)"
        @update:obesidade="updateComorbidade('obesidade', $event)"
        @update:outros="updateComorbidade('outros', $event)"
      />
      <informacoes-complementares/>
      <vinculo-epidemiologico/>
      <conclusao-atendimento/>
      <realizado-coleta/>
      <observacoes/>
      <botao-enviar/>
    </base-page>
  </section>
</template>

<script>
import BasePage from '@/components/commons/BasePage.vue';
import IdentificacaoCaso from '@/components/Notificacao/Form/IdentificacaoCaso/index.vue';
import SinaisESintomas from '@/components/Notificacao/Form/SinaisESintomas/index.vue';
import Comorbidades from '@/components/Notificacao/Form/Comorbidades/index.vue';
import InformacoesComplementares from '@/components/Notificacao/Form/InformacoesComplementares/index.vue';
import VinculoEpidemiologico from '@/components/Notificacao/Form/VinculoEpidemiologico/index.vue';
import ConclusaoAtendimento from '@/components/Notificacao/Form/ConclusaoAtendimento/index.vue';
import RealizadoColeta from '@/components/Notificacao/Form/RealizadoColeta/index.vue';
import Observacoes from '@/components/Notificacao/Form/Observacoes/index.vue';
import BotaoEnviar from '@/components/Notificacao/Form/BotaoEnviar.vue';
import Notificacao from '@/entities/Notificacao';

export default {
  components: {
    BasePage,
    IdentificacaoCaso,
    SinaisESintomas,
    Comorbidades,
    InformacoesComplementares,
    VinculoEpidemiologico,
    ConclusaoAtendimento,
    RealizadoColeta,
    Observacoes,
    BotaoEnviar,
  },
  data: () => ({
    notificacao: new Notificacao(),
  }),
  methods: {
    updateSintomatico(sintomatico) {
      this.notificacao.sintomatico = sintomatico;
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.notificacao.dataInicioDosSintomas = dataInicioDosSintomas;
    },
    updateSintoma(tipoSintoma, valor) {
      this.notificacao.sintomas[tipoSintoma] = valor;
    },
    updateComorbidade(tipoComorbidade, valor) {
      this.notificacao.comorbidades[tipoComorbidade] = valor;
    },
  },
};
</script>
