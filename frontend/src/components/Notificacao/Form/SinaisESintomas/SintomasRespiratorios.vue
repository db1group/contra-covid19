<template>
  <div class="mt-2">
    <v-row no-gutters>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">Sintomas respiratórios</label>
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.febreAferidaReferida"
          label="Febre (aferida/referida)"
          hide-details
          :disabled="!sintomatico"
          @change="updateFebreAferidaReferida"
        />
        <v-text-field
          :input-value="sintomas.temperaturaFebre"
          class="px-8"
          label="Informar temperatura"
          suffix="°C"
          :disabled="!sintomatico || !sintomas.febreAferidaReferida"
          v-mask="'##,#'"
          @input="updateTemperaturaFebre"
        />
        <v-checkbox
          :input-value="sintomas.cianoseCentral"
          label="CIANOSE CENTRAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateCianoseCentral"
        />
        <v-checkbox
          :input-value="sintomas.congestaoNasal"
          label="CONGESTÃO NASAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateCongestaoNasal"
        />
        <v-checkbox
          :input-value="sintomas.coriza"
          label="CORIZA"
          hide-details
          :disabled="!sintomatico"
          @change="updateCoriza"
        />
        <v-checkbox
          :input-value="sintomas.batimentoAsasNasais"
          label="BATIMENTO DE ASAS NASAIS"
          hide-details
          :disabled="!sintomatico"
          @change="updateBatimentoAsasNasais"
        />
        <v-checkbox
          :input-value="sintomas.dispneia"
          label="DISPNEIA (DIFICULDADE DE RESPIRAR)"
          hide-details
          :disabled="!sintomatico"
          @change="updateDispneia"
        />
        <v-checkbox
          :input-value="sintomas.dorDeGarganta"
          label="DOR DE GARGANTA"
          hide-details
          :disabled="!sintomatico"
          @change="updateDorDeGarganta"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.saturacaoDeOximetriaDePulso"
          label="SATURAÇÃO DE OXIMETRIA DE PULSO < 95% EM AR AMBIENTE"
          hide-details
          :disabled="!sintomatico"
          @change="updateSaturacaoDeOximetriaDePulso"
        />
        <v-checkbox
          :input-value="sintomas.sibilo"
          label="SIBILO / Chiado no peito"
          hide-details
          :disabled="!sintomatico"
          @change="updateSibilo"
        />
        <v-checkbox
          :input-value="sintomas.taquipneia"
          label="TAQUIPNEIA (>30 IPM)"
          hide-details
          :disabled="!sintomatico"
          @change="updateTaquipneia"
        />
        <v-checkbox
          :input-value="sintomas.escarro"
          label="ESCARRO"
          hide-details
          :disabled="!sintomatico"
          @change="updateEscarro"
        />
        <v-checkbox
          :input-value="sintomas.tosse"
          label="TOSSE"
          hide-details
          :disabled="!sintomatico"
          @change="updateTosse"
        />
        <v-checkbox
          :input-value="sintomas.tiragemIntercostal"
          label="TIRAGEM INTERCOSTAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateTiragemIntercostal"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import Sintomas from '@/entities/Sintomas';

export default {
  directives: { mask },
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
    updateFebreAferidaReferida(febreAferidaReferida) {
      this.$emit('update:febreAferidaReferida', febreAferidaReferida);
      if (!febreAferidaReferida) {
        this.updateTemperaturaFebre('');
      }
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
      this.$emit('update:coriza', coriza);
    },
    updateBatimentoAsasNasais(batimentoAsasNasais) {
      this.$emit('update:batimentoAsasNasais', batimentoAsasNasais);
    },
    updateDispneia(dispneia) {
      this.$emit('update:dispneia', dispneia);
    },
    updateDorDeGarganta(dorDeGarganta) {
      this.$emit('update:dorDeGarganta', dorDeGarganta);
    },
    updateSaturacaoDeOximetriaDePulso(saturacaoDeOximetriaDePulso) {
      this.$emit('update:saturacaoDeOximetriaDePulso', saturacaoDeOximetriaDePulso);
    },
    updateSibilo(sibilo) {
      this.$emit('update:sibilo', sibilo);
    },
    updateTaquipneia(taquipneia) {
      this.$emit('update:taquipneia', taquipneia);
    },
    updateEscarro(escarro) {
      this.$emit('update:escarro', escarro);
    },
    updateTosse(tosse) {
      this.$emit('update:tosse', tosse);
    },
    updateTiragemIntercostal(tiragemIntercostal) {
      this.$emit('update:tiragemIntercostal', tiragemIntercostal);
    },
  },
};
</script>
