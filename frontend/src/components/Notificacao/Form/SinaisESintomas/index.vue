<template>
  <div class="px-2">
    <h4 class="primary--text title">
      4. SINAIS E SINTOMAS
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <sintomas-gerais
        :sintomatico="sintomatico"
        :data-inicio-dos-sintomas="dataInicioDosSintomas"
        @update:sintomatico="updateSintomatico"
        @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
        :disabled="disabled"
      />
      <sintomas-respiratorios
        :sintomatico="sintomatico"
        :sintomas="sintomas"
        @update:febreAferidaReferida="updateFebreAferidaReferida"
        @update:temperaturaFebre="updateTemperaturaFebre"
        @update:cianoseCentral="updateCianoseCentral"
        @update:congestaoNasal="updateCongestaoNasal"
        @update:coriza="updateCoriza"
        @update:batimentoAsasNasais="updateBatimentoAsasNasais"
        @update:dispneia="updateDispneia"
        @update:dorDeGarganta="updateDorDeGarganta"
        @update:saturacaoDeOximetriaDePulso="updateSaturacaoDeOximetriaDePulso"
        @update:sibilo="updateSibilo"
        @update:taquipneia="updateTaquipneia"
        @update:escarro="updateEscarro"
        @update:tosse="updateTosse"
        @update:tiragemIntercostal="updateTiragemIntercostal"
        :disabled="disabled"
      />
      <outros-sintomas
        :sintomatico="sintomatico"
        :sintomas="sintomas"
        @update:adinamiaFraqueza="updateAdinamiaFraqueza"
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
        @update:nauseaVomito="updateNauseaVomito"
        @update:hipotensao="updateHipotensao"
        @update:outros="updateOutros"
        :disabled="disabled"
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
    disabled: {
      type: Boolean,
      defaultValue: false,
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
    updateBatimentoAsasNasais(batimentoAsasNasais) {
      this.$emit('update:batimentoAsasNasais', batimentoAsasNasais);
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
    updateEscarro(escarro) {
      this.$emit('update:escarro', escarro);
    },
    updateTosse(tosse) {
      this.$emit('update:sintomaTosse', tosse);
    },
    updateTiragemIntercostal(tiragemIntercostal) {
      this.$emit('update:tiragemIntercostal', tiragemIntercostal);
    },
    updateAdinamiaFraqueza(adinamiaFraqueza) {
      this.$emit('update:adinamiaFraqueza', adinamiaFraqueza);
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
    updateNauseaVomito(nauseaVomito) {
      this.$emit('update:nauseaVomito', nauseaVomito);
    },
    updateHipotensao(hipotensao) {
      this.$emit('update:hipotensao', hipotensao);
    },
    updateOutros(outros) {
      this.$emit('update:outrosSintomas', outros);
    },
  },
};
</script>
