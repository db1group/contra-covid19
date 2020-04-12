<template>
  <section>
    <h3 class="primary--text my-7 display-1 text-center">
      Cadastro de notificação
    </h3>
    <base-page>
      <pre>{{ notificacao.sintomas }}</pre>
      <identificacao-caso/>
      <sinais-e-sintomas
        :sintomatico="notificacao.sintomatico"
        :data-inicio-dos-sintomas="notificacao.dataInicioDosSintomas"
        :sintomas="notificacao.sintomas"
        @update:sintomatico="updateSintomatico"
        @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
        @update:sintomaCoriza="updateSintomaCoriza"
        @update:sintomaTosseSeca="updateSintomaTosseSeca"
        @update:sintomaDorDeGarganta="updateSintomaDorDeGarganta"
        @update:sintomaMialgia="updateSintomaMialgia"
        @update:tosseProdutiva="updateTosseProdutiva"
        @update:sibilo="updateSibilo"
        @update:desconfortoRespiratorio="updateDesconfortoRespiratorio"
        @update:dispneia="updateDispneia"
        @update:taquipneia="updateTaquipneia"
        @update:saturacaoDeOximetriaDePulso="updateSaturacaoDeOximetriaDePulso"
        @update:cianoseCentral="updateCianoseCentral"
        @update:diminuicaoDePulsoPeriferico="updateDiminuicaoDePulsoPeriferico"
        @update:hipotensao="updateHipotensao"
      />
      <comorbidades/>
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
    updateSintomaCoriza(coriza) {
      this.notificacao.sintomas.coriza = coriza;
    },
    updateSintomaTosseSeca(tosseSeca) {
      this.notificacao.sintomas.tosseSeca = tosseSeca;
    },
    updateSintomaDorDeGarganta(dorDeGarganta) {
      this.notificacao.sintomas.dorDeGarganta = dorDeGarganta;
    },
    updateSintomaMialgia(mialgia) {
      this.notificacao.sintomas.mialgia = mialgia;
    },
    updateTosseProdutiva(tosseProdutiva) {
      this.notificacao.sintomas.tosseProdutiva = tosseProdutiva;
    },
    updateSibilo(sibilo) {
      this.notificacao.sintomas.sibilo = sibilo;
    },
    updateDesconfortoRespiratorio(desconfortoRespiratorio) {
      this.notificacao.sintomas.desconfortoRespiratorio = desconfortoRespiratorio;
    },
    updateDispneia(dispneia) {
      this.notificacao.sintomas.dispneia = dispneia;
    },
    updateTaquipneia(taquipneia) {
      this.notificacao.sintomas.taquipneia = taquipneia;
    },
    updateSaturacaoDeOximetriaDePulso(saturacaoDeOximetriaDePulso) {
      this.notificacao.sintomas.saturacaoDeOximetriaDePulso = saturacaoDeOximetriaDePulso;
    },
    updateCianoseCentral(cianoseCentral) {
      this.notificacao.sintomas.cianoseCentral = cianoseCentral;
    },
    updateDiminuicaoDePulsoPeriferico(diminuicaoDePulsoPeriferico) {
      this.notificacao.sintomas.diminuicaoDePulsoPeriferico = diminuicaoDePulsoPeriferico;
    },
    updateHipotensao(hipotensao) {
      this.notificacao.sintomas.hipotensao = hipotensao;
    },
  },
};
</script>
