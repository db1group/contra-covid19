<template>
  <div class="px-2">
    <h4 class="primary--text title">
      4. SINAIS E SINTOMAS
    </h4>
    <v-container fluid class="pa-0">
      <sintomas-gerais
        :sintomatico="sintomatico"
        :data-inicio-dos-sintomas="dataInicioDosSintomas"
        @update:sintomatico="updateSintomatico"
        @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
      />
      <sintomas-respiratorios
        :sintomatico="sintomatico"
        :sintomas="sintomas"
        @update:febreAferidaReferida="updateFebreAferidaReferida"
        @update:temperaturaFebre="updateTemperaturaFebre"
        @update:cianoseCentral="updateCianoseCentral"
        @update:congestaoNasal="updateCongestaoNasal"
        @update:coriza="updateCoriza"
        @update:desconfortoRespiratorio="updateDesconfortoRespiratorio"
        @update:dispneia="updateDispneia"
        @update:dorDeGarganta="updateDorDeGarganta"
        @update:saturacaoDeOximetriaDePulso="updateSaturacaoDeOximetriaDePulso"
        @update:sibilo="updateSibilo"
        @update:taquipneia="updateTaquipneia"
        @update:tosseProdutiva="updateTosseProdutiva"
        @update:tosseSeca="updateTosseSeca"
        @update:tiragemIntercostal="updateTiragemIntercostal"
      />
      <outros-sintomas
        :sintomatico="sintomatico"
        :sintomas="sintomas"
        @update:adiamiaOuFraqueza="updateAdiamiaOuFraqueza"
        @update:artralgia="updateArtralgia"
        @update:calafrios="updateCalafrios"
        @update:cefaleia="updateCefaleia"
        @update:conjuntivite="updateConjuntivite"
        @update:diarreia="updateDiarreia"
        @update:dificuldadeDeglutir="updateDificuldadeDeglutir"
        @update:diminuicaoDePulsoPeriferico="updateDiminuicaoDePulsoPeriferico"
        @update:gangliosLinfaticos="updateGangliosLinfaticos"
        @update:irritabilidadeOuConfusao="updateIrritabilidadeOuConfusao"
        @update:manchasVermelhas="updateManchasVermelhas"
        @update:mialgia="updateMialgia"
        @update:nausea="updateNausea"
        @update:hipotensao="updateHipotensao"
        @update:vomito="updateVomito"
        @update:outros="updateOutros"
      />
    </v-container>
  </div>
</template>
<script>
import Sintomas from '@/entities/Sintomas';
import SintomasGerais from './SintomasGerais.vue';
import SintomasRespiratorios from './SintomasRespiratorios.vue';
import OutrosSintomas from './OutrosSintomas.vue';

export default {
  components: {
    SintomasGerais,
    SintomasRespiratorios,
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
    updateFebreAferidaReferida(febreAferidaReferida) {
      this.$emit('update:febreAferidaReferida', febreAferidaReferida);
    },
    updateTemperaturaFebre(temperaturaFebre) {
      this.$emit('update:temperaturaFebre', temperaturaFebre);
    },
    updateCianoseCentral(cianoseCentral) {
      this.$emit('update:cianoseCentral', cianoseCentral);
    },
    updateCongestaoNasal(congestaoNasal) {
      this.$emit('update:congestaoNasal', congestaoNasal);
    },
    updateCoriza(coriza) {
      this.$emit('update:sintomaCoriza', coriza);
    },
    updateDesconfortoRespiratorio(desconfortoRespiratorio) {
      this.$emit('update:desconfortoRespiratorio', desconfortoRespiratorio);
    },
    updateDispneia(dispneia) {
      this.$emit('update:dispneia', dispneia);
    },
    updateDorDeGarganta(dorDeGarganta) {
      this.$emit('update:sintomaDorDeGarganta', dorDeGarganta);
    },
    updateSibilo(sibilo) {
      this.$emit('update:sibilo', sibilo);
    },
    updateTaquipneia(taquipneia) {
      this.$emit('update:taquipneia', taquipneia);
    },
    updateSaturacaoDeOximetriaDePulso(saturacaoDeOximetriaDePulso) {
      this.$emit('update:saturacaoDeOximetriaDePulso', saturacaoDeOximetriaDePulso);
    },
    updateTosseProdutiva(tosseProdutiva) {
      this.$emit('update:tosseProdutiva', tosseProdutiva);
    },
    updateTosseSeca(tosseSeca) {
      this.$emit('update:sintomaTosseSeca', tosseSeca);
    },
    updateTiragemIntercostal(tiragemIntercostal) {
      this.$emit('update:tiragemIntercostal', tiragemIntercostal);
    },

    updateAdiamiaOuFraqueza(adiamiaOuFraqueza) {
      this.$emit('update:adiamiaOuFraqueza', adiamiaOuFraqueza);
    },
    updateArtralgia(artralgia) {
      this.$emit('update:artralgia', artralgia);
    },
    updateCalafrios(calafrios) {
      this.$emit('update:calafrios', calafrios);
    },
    updateCefaleia(cefaleia) {
      this.$emit('update:cefaleia', cefaleia);
    },
    updateConjuntivite(conjuntivite) {
      this.$emit('update:conjuntivite', conjuntivite);
    },
    updateDiarreia(diarreia) {
      this.$emit('update:diarreia', diarreia);
    },
    updateDificuldadeDeglutir(dificuldadeDeglutir) {
      this.$emit('update:dificuldadeDeglutir', dificuldadeDeglutir);
    },
    updateDiminuicaoDePulsoPeriferico(diminuicaoDePulsoPeriferico) {
      this.$emit('update:diminuicaoDePulsoPeriferico', diminuicaoDePulsoPeriferico);
    },
    updateGangliosLinfaticos(gangliosLinfaticos) {
      this.$emit('update:gangliosLinfaticos', gangliosLinfaticos);
    },
    updateIrritabilidadeOuConfusao(irritabilidadeOuConfusao) {
      this.$emit('update:irritabilidadeOuConfusao', irritabilidadeOuConfusao);
    },
    updateManchasVermelhas(manchasVermelhas) {
      this.$emit('update:manchasVermelhas', manchasVermelhas);
    },
    updateMialgia(mialgia) {
      this.$emit('update:sintomaMialgia', mialgia);
    },
    updateNausea(nausea) {
      this.$emit('update:nausea', nausea);
    },
    updateHipotensao(hipotensao) {
      this.$emit('update:hipotensao', hipotensao);
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
