<template>
  <div class="px-2">
    <h4 class="primary--text title">
      2. SINAIS E SINTOMAS
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <sintomas-gerais
        :sintomatico="sintomatico"
        :data-inicio-dos-sintomas="dataInicioDosSintomas"
        :sintomas="sintomas"
        @update:sintomatico="updateSintomatico"
        @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
      />
      <sintomas-respiratorios-leves
        :sintomatico="sintomatico"
        :sintomas="sintomas"
        @update:coriza="updateCoriza"
        @update:tosseSeca="updateTosseSeca"
        @update:dorDeGarganta="updateDorDeGarganta"
        @update:mialgia="updateMialgia"
      />
      <sintomas-respiratorios-graves
        :sintomatico="sintomatico"
        :sintomas="sintomas"
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
      <outros-sintomas
        :sintomatico="sintomatico"
        :sintomas="sintomas"
        @update:diarreia="updateDiarreia"
        @update:cefaleia="updateCefaleia"
        @update:nausea="updateNausea"
        @update:vomito="updateVomito"
        @update:outros="updateOutros"
      />
    </v-container>
  </div>
</template>
<script>
import Sintomas from '@/entities/Sintomas';
import SintomasGerais from './SintomasGerais.vue';
import SintomasRespiratoriosLeves from './SintomasRespiratoriosLeves.vue';
import SintomasRespiratoriosGraves from './SintomasRespiratoriosGraves.vue';
import OutrosSintomas from './OutrosSintomas.vue';

export default {
  components: {
    SintomasGerais,
    SintomasRespiratoriosLeves,
    SintomasRespiratoriosGraves,
    OutrosSintomas,
  },
  props: {
    sintomatico: {
      type: Boolean,
      required: true,
    },
    dataInicioDosSintomas: {
      type: String,
      required: true,
    },
    sintomas: {
      type: Sintomas,
      required: true,
    },
  },
  methods: {
    updateSintomatico(sintomatico) {
      this.$emit('update:sintomatico', sintomatico);
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.$emit('update:dataInicioDosSintomas', dataInicioDosSintomas);
    },
    updateCoriza(coriza) {
      this.$emit('update:sintomaCoriza', coriza);
    },
    updateTosseSeca(tosseSeca) {
      this.$emit('update:sintomaTosseSeca', tosseSeca);
    },
    updateDorDeGarganta(dorDeGarganta) {
      this.$emit('update:sintomaDorDeGarganta', dorDeGarganta);
    },
    updateMialgia(mialgia) {
      this.$emit('update:sintomaMialgia', mialgia);
    },
    updateTosseProdutiva(tosseProdutiva) {
      this.$emit('update:tosseProdutiva', tosseProdutiva);
    },
    updateSibilo(sibilo) {
      this.$emit('update:sibilo', sibilo);
    },
    updateDesconfortoRespiratorio(desconfortoRespiratorio) {
      this.$emit('update:desconfortoRespiratorio', desconfortoRespiratorio);
    },
    updateDispneia(dispneia) {
      this.$emit('update:dispneia', dispneia);
    },
    updateTaquipneia(taquipneia) {
      this.$emit('update:taquipneia', taquipneia);
    },
    updateSaturacaoDeOximetriaDePulso(saturacaoDeOximetriaDePulso) {
      this.$emit('update:saturacaoDeOximetriaDePulso', saturacaoDeOximetriaDePulso);
    },
    updateCianoseCentral(cianoseCentral) {
      this.$emit('update:cianoseCentral', cianoseCentral);
    },
    updateDiminuicaoDePulsoPeriferico(diminuicaoDePulsoPeriferico) {
      this.$emit('update:diminuicaoDePulsoPeriferico', diminuicaoDePulsoPeriferico);
    },
    updateHipotensao(hipotensao) {
      this.$emit('update:hipotensao', hipotensao);
    },
    updateDiarreia(diarreia) {
      this.$emit('update:diarreia', diarreia);
    },
    updateCefaleia(cefaleia) {
      this.$emit('update:cefaleia', cefaleia);
    },
    updateNausea(nausea) {
      this.$emit('update:nausea', nausea);
    },
    updateVomito(vomito) {
      this.$emit('update:vomito', vomito);
    },
    updateOutros(outros) {
      this.$emit('update:outrosSintomas', outros);
    },
  },
};
</script>
