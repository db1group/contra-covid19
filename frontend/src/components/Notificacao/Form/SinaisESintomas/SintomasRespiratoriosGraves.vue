<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">Sintomas respiratórios GRAVES</label>
        <v-checkbox
          :input-value="sintomas.escarro"
          label="ESCARRO"
          hide-details
          :disabled="!sintomatico"
          @change="updateEscarro"
        />
        <v-checkbox
          :input-value="sintomas.sibilo"
          label="SIBILO / Chiado no peito"
          hide-details
          :disabled="!sintomatico"
          @change="updateSibilo"
        />
        <v-checkbox
          :input-value="sintomas.batimentoAsasNasais"
          label="Batimento de asas nasais"
          hide-details
          :disabled="!sintomatico"
          @change="updateBatimentoAsasNasais"
        />
        <v-checkbox
          :input-value="sintomas.dispneia"
          label="Dispneia (dificuldade de respirar)"
          hide-details
          :disabled="!sintomatico"
          @change="updateDispneia"
        />
        <v-checkbox
          :input-value="sintomas.taquipneia"
          label="TAQUIPNEIA (>30 IPM)"
          hide-details
          :disabled="!sintomatico"
          @change="updateTaquipneia"
        />
        <v-checkbox
          :input-value="sintomas.saturacaoDeOximetriaDePulso"
          label="SATURAÇÃO DE OXIMETRIA DE PULSO < 95% EM AR AMBIENTE"
          hide-details
          :disabled="!sintomatico"
          @change="updateSaturacaoDeOximetriaDePulso"
        />
        <v-checkbox
          :input-value="sintomas.cianoseCentral"
          label="CIANOSE CENTRAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateCianoseCentral"
        />
        <v-checkbox
          :input-value="sintomas.diminuicaoDePulsoPeriferico"
          label="DIMINUIÇÃO DE PULSO PERIFÉRICO"
          hide-details
          :disabled="!sintomatico"
          @change="updateDiminuicaoDePulsoPeriferico"
        />
        <v-checkbox
          :input-value="sintomas.hipotensao"
          label="SINAIS DE HIPOTENSÃO (PAS < 90mmHg e/ou PAD < 60mmHg)"
          hide-details
          :disabled="!sintomatico"
          @change="updateHipotensao"
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
  methods: {
    updateEscarro(escarro) {
      this.$emit('update:escarro', escarro);
    },
    updateSibilo(sibilo) {
      this.$emit('update:sibilo', sibilo);
    },
    updateBatimentoAsasNasais(batimentoAsasNasais) {
      this.$emit('update:batimentoAsasNasais', batimentoAsasNasais);
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
  },
};
</script>
