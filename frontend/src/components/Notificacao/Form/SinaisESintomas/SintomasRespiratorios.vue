<template>
  <div class="mt-2">
    <v-row no-gutters>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">
          Sintomas respiratórios
        </label>
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.febreAferidaReferida"
          label="Febre (aferida/referida)"
          hide-details
          :disabled="disableFields"
          @change="updateFebreAferidaReferida"
        />
        <v-text-field
          :value="sintomas.temperaturaFebre"
          class="px-8"
          label="Informar temperatura"
          suffix="°C"
          :disabled="disableFebre"
          v-mask="'##,#'"
          @input="updateTemperaturaFebre"
        />
        <v-checkbox
          :input-value="sintomas.cianoseCentral"
          label="CIANOSE CENTRAL"
          hide-details
          :disabled="disableFields"
          @change="updateCianoseCentral"
        />
        <v-checkbox
          :input-value="sintomas.congestaoNasal"
          label="CONGESTÃO NASAL"
          hide-details
          :disabled="disableFields"
          @change="updateCongestaoNasal"
        />
        <v-checkbox
          :input-value="sintomas.coriza"
          label="CORIZA"
          hide-details
          :disabled="disableFields"
          @change="updateCoriza"
        />
        <v-checkbox
          :input-value="sintomas.desconfortoRespiratorio"
          label="DESCONFORTO RESPIRATÓRIO / Dificuldade para respirar / Falta de ar"
          hide-details
          :disabled="disableFields"
          @change="updateDesconfortoRespiratorio"
        />
        <v-checkbox
          :input-value="sintomas.dispneia"
          label="DISPNEIA com batimento das asas nasais E/OU retração intercostal E/OU fúrcula external"
          hide-details
          :disabled="disableFields"
          @change="updateDispneia"
        />
        <v-checkbox
          :input-value="sintomas.dorDeGarganta"
          label="DOR DE GARGANTA"
          hide-details
          :disabled="disableFields"
          @change="updateDorDeGarganta"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          :input-value="sintomas.saturacaoDeOximetriaDePulso"
          label="SATURAÇÃO DE OXIMETRIA DE PULSO < 95% EM AR AMBIENTE"
          hide-details
          :disabled="disableFields"
          @change="updateSaturacaoDeOximetriaDePulso"
        />
        <v-checkbox
          :input-value="sintomas.sibilo"
          label="SIBILO / Chiado no peito"
          hide-details
          :disabled="disableFields"
          @change="updateSibilo"
        />
        <v-checkbox
          :input-value="sintomas.taquipneia"
          label="TAQUIPNEIA (>30 IPM)"
          hide-details
          :disabled="disableFields"
          @change="updateTaquipneia"
        />
        <v-checkbox
          :input-value="sintomas.tosseProdutiva"
          label="TOSSE PRODUTIVA"
          hide-details
          :disabled="disableFields"
          @change="updateTosseProdutiva"
        />
        <v-checkbox
          :input-value="sintomas.tosseSeca"
          label="TOSSE SECA"
          hide-details
          :disabled="disableFields"
          @change="updateTosseSeca"
        />
        <v-checkbox
          :input-value="sintomas.tiragemIntercostal"
          label="TIRAGEM INTERCOSTAL"
          hide-details
          :disabled="disableFields"
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
    disableFebre() {
      if (this.disabled) return true;
      return !this.sintomatico || !this.sintomas.febreAferidaReferida;
    },
  },
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
    updateDesconfortoRespiratorio(desconfortoRespiratorio) {
      this.$emit('update:desconfortoRespiratorio', desconfortoRespiratorio);
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
    updateTosseProdutiva(tosseProdutiva) {
      this.$emit('update:tosseProdutiva', tosseProdutiva);
    },
    updateTosseSeca(tosseSeca) {
      this.$emit('update:tosseSeca', tosseSeca);
    },
    updateTiragemIntercostal(tiragemIntercostal) {
      this.$emit('update:tiragemIntercostal', tiragemIntercostal);
    },
  },
};
</script>
