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
          :disabled="disableFields"
          @change="updateFebreAferidaReferida"
        />
        <v-text-field
          :value="sintomas.temperaturaFebre"
          :rules="rules.temperaturaFebre"
          ref="temperaturaFebre"
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
          :input-value="sintomas.batimentoAsasNasais"
          label="BATIMENTO DE ASAS NASAIS"
          hide-details
          :disabled="disableFields"
          @change="updateBatimentoAsasNasais"
        />
        <v-checkbox
          :input-value="sintomas.dispneia"
          label="DISPNEIA (DIFICULDADE DE RESPIRAR)"
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
          :input-value="sintomas.escarro"
          label="ESCARRO"
          hide-details
          :disabled="disableFields"
          @change="updateEscarro"
        />
        <v-checkbox
          :input-value="sintomas.tosse"
          label="TOSSE"
          hide-details
          :disabled="disableFields"
          @change="updateTosse"
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
import { required } from '@/validations/CommonValidations';

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
  data: () => ({
    rules: {
      temperaturaFebre: [],
    },
  }),
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
        this.removeRequiredInFields();
        return;
      }
      this.addRequiredInFields();
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
    validate() {
      this.$refs.temperaturaFebre.validate();
    },
    removeRequiredInFields() {
      this.rules.temperaturaFebre = [];
      this.validate();
    },
    addRequiredInFields() {
      this.rules.temperaturaFebre.push(required);
      this.validate();
    },
  },
};
</script>
