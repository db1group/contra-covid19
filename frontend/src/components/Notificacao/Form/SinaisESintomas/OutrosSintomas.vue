<template>
  <div>
    <v-row>
      <v-col cols="12" class="mt-5 pb-0">
        <label class="primary--text body-1 font-weight-bold">
          Outros sinais e sintomas apresentados durante o período
        </label>
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.adiamiaOuFraqueza"
          label="ADINAMIA / FRAQUEZA"
          hide-details
          :disabled="!sintomatico"
          @change="updateAdiamiaOuFraqueza"
        />
        <v-checkbox
          :input-value="sintomas.artralgia"
          label="ARTRALGIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateArtralgia"
        />
        <v-checkbox
          :input-value="sintomas.calafrios"
          label="CALAFRIOS"
          hide-details
          :disabled="!sintomatico"
          @change="updateCalafrios"
        />
        <v-checkbox
          :input-value="sintomas.cefaleia"
          label="CEFALÉIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateCefaleia"
        />
        <v-checkbox
          :input-value="sintomas.conjuntivite"
          label="CONJUNTIVITE"
          hide-details
          :disabled="!sintomatico"
          @change="updateConjuntivite"
        />
        <v-checkbox
          :input-value="sintomas.diarreia"
          label="DIARRÉIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateDiarreia"
        />
        <v-checkbox
          :input-value="sintomas.dificuldadeDeglutir"
          label="DIFICULDADE DE DEGLUTIR"
          hide-details
          :disabled="!sintomatico"
          @change="updateDificuldadeDeglutir"
        />
        <v-checkbox
          :input-value="sintomas.diminuicaoDePulsoPeriferico"
          label="DIMINUIÇÃO DE PULSO PERIFÉRICO"
          hide-details
          :disabled="!sintomatico"
          @change="updateDiminuicaoDePulsoPeriferico"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.gangliosLinfaticos"
          label="GÂNGLIOS LINFÁTICOS"
          hide-details
          :disabled="!sintomatico"
          @change="updateGangliosLinfaticos"
        />
        <v-checkbox
          :input-value="sintomas.irritabilidadeOuConfusao"
          label="IRRITABILIDADE / CONFUSÃO"
          hide-details
          :disabled="!sintomatico"
          @change="updateIrritabilidadeOuConfusao"
        />
        <v-checkbox
          :input-value="sintomas.manchasVermelhas"
          label="MANCHAS VERMELHAS"
          hide-details
          :disabled="!sintomatico"
          @change="updateManchasVermelhas"
        />
        <v-checkbox
          :input-value="sintomas.mialgia"
          label="MIALGIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateMialgia"
        />
        <v-checkbox
          :input-value="sintomas.nausea"
          label="NÁUSEA"
          hide-details
          :disabled="!sintomatico"
          @change="updateNausea"
        />
        <v-checkbox
          :input-value="sintomas.hipotensao"
          label="SINAIS DE HIPOTENSÃO (PAS < 90mmHg e/ou PAD < 60mmHg)"
          hide-details
          :disabled="!sintomatico"
          @change="updateHipotensao"
        />
        <v-checkbox
          :input-value="sintomas.vomito"
          label="VÔMITO"
          hide-details
          :disabled="!sintomatico"
          @change="updateVomito"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          :input-value="existemOutrosSintomas"
          label="Outros sintomas"
          hide-details
          :disabled="!sintomatico"
          @change="updateExistemOutrosSintomas"
        />
        <v-text-field
          :value="sintomas.outros"
          class="pl-8"
          label="Especifique"
          :disabled="!existemOutrosSintomas || !sintomatico"
          @input="updateOutros"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Sintomas from '@/entities/Sintomas';

export default {
  props: {
    sintomas: {
      type: Sintomas,
      required: true,
    },
    sintomatico: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    existemOutrosSintomas: false,
  }),
  methods: {
    updateExistemOutrosSintomas(existemOutrosSintomas) {
      this.existemOutrosSintomas = existemOutrosSintomas;
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
      this.$emit('update:mialgia', mialgia);
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
      this.$emit('update:outros', outros);
    },
  },
};
</script>
