<template>
  <div>
    <v-row>
      <v-col cols="12" class="mt-5 pb-0">
        <label
          class="primary--text body-1 font-weight-bold"
        >Outros sinais e sintomas apresentados durante o período</label>
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.adinamiaFraqueza"
          label="ADINAMIA / FRAQUEZA"
          hide-details
          :disabled="disableFields"
          @change="updateAdinamiaFraqueza"
        />
        <v-checkbox
          :input-value="sintomas.artralgia"
          label="ARTRALGIA"
          hide-details
          :disabled="disableFields"
          @change="updateArtralgia"
        />
        <v-checkbox
          :input-value="sintomas.calafrios"
          label="CALAFRIOS"
          hide-details
          :disabled="disableFields"
          @change="updateCalafrios"
        />
        <v-checkbox
          :input-value="sintomas.cefaleia"
          label="CEFALÉIA"
          hide-details
          :disabled="disableFields"
          @change="updateCefaleia"
        />
        <v-checkbox
          :input-value="sintomas.conjuntivite"
          label="CONJUNTIVITE"
          hide-details
          :disabled="disableFields"
          @change="updateConjuntivite"
        />
        <v-checkbox
          :input-value="sintomas.diarreia"
          label="DIARRÉIA"
          hide-details
          :disabled="disableFields"
          @change="updateDiarreia"
        />
        <v-checkbox
          :input-value="sintomas.dificuldadeDeglutir"
          label="DIFICULDADE DE DEGLUTIR"
          hide-details
          :disabled="disableFields"
          @change="updateDificuldadeDeglutir"
        />
        <v-checkbox
          :input-value="sintomas.diminuicaoDePulsoPeriferico"
          label="DIMINUIÇÃO DE PULSO PERIFÉRICO"
          hide-details
          :disabled="disableFields"
          @change="updateDiminuicaoDePulsoPeriferico"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.gangliosLinfaticos"
          label="GÂNGLIOS LINFÁTICOS"
          hide-details
          :disabled="disableFields"
          @change="updateGangliosLinfaticos"
        />
        <v-checkbox
          :input-value="sintomas.irritabilidadeOuConfusao"
          label="IRRITABILIDADE / CONFUSÃO"
          hide-details
          :disabled="disableFields"
          @change="updateIrritabilidadeOuConfusao"
        />
        <v-checkbox
          :input-value="sintomas.manchasVermelhas"
          label="MANCHAS VERMELHAS"
          hide-details
          :disabled="disableFields"
          @change="updateManchasVermelhas"
        />
        <v-checkbox
          :input-value="sintomas.mialgia"
          label="MIALGIA"
          hide-details
          :disabled="disableFields"
          @change="updateMialgia"
        />
        <v-checkbox
          :input-value="sintomas.hipotensao"
          label="SINAIS DE HIPOTENSÃO (PAS < 90mmHg e/ou PAD < 60mmHg)"
          hide-details
          :disabled="disableFields"
          @change="updateHipotensao"
        />
        <v-checkbox
          :input-value="sintomas.nauseaVomito"
          label="NÁUSEA/VÔMITO"
          hide-details
          :disabled="disableFields"
          @change="updateNauseaVomito"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          :input-value="sintomas.existemOutrosSintomas"
          label="Outros sintomas"
          hide-details
          :disabled="disableFields"
          @change="updateExistemOutrosSintomas"
        />
        <v-text-field
          :value="sintomas.outros"
          class="pl-8"
          label="Especifique"
          :disabled="disableOutros"
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
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.sintomatico;
    },
    disableOutros() {
      if (this.disabled) return true;
      return !this.sintomas.existemOutrosSintomas || !this.sintomatico;
    },
  },
  methods: {
    updateExistemOutrosSintomas(existemOutrosSintomas) {
      this.sintomas.existemOutrosSintomas = existemOutrosSintomas;
      if (!this.sintomas.existemOutrosSintomas) {
        this.updateOutros('');
      }
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
      this.$emit('update:mialgia', mialgia);
    },
    updateHipotensao(hipotensao) {
      this.$emit('update:hipotensao', hipotensao);
    },
    updateNauseaVomito(nauseaVomito) {
      this.$emit('update:nauseaVomito', nauseaVomito);
    },
    updateOutros(outros) {
      this.$emit('update:outros', outros);
    },
  },
};
</script>
