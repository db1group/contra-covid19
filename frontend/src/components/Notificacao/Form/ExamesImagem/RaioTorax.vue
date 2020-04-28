<template>
  <div>
    <label class="primary--text body-1 font-weight-bold">Raio do tórax</label>
    <v-checkbox
      :input-value="examesImagem.raioNormal"
      label="NORMAL"
      hide-details
      :disabled="disableFields"
      @change="updateRaioNormal"
    />
    <v-checkbox
      :input-value="examesImagem.raioInfiltradoIntersticial"
      label="INFILTRADO INTERSTICIAL"
      hide-details
      :disabled="disableFields"
      @change="updateRaioInfiltradoIntersticial"
    />
    <v-checkbox
      :input-value="examesImagem.raioConsolidacao"
      label="CONSOLIDAÇÃO"
      hide-details
      :disabled="disableFields"
      @change="updateRaioConsolidacao"
    />
    <v-checkbox
      :input-value="examesImagem.raioMisto"
      label="MISTO"
      hide-details
      :disabled="disableFields"
      @change="updateRaioMisto"
    />
    <v-checkbox
      :input-value="examesImagem.realizouOutroRaioTorax"
      label="OUTRO"
      hide-details
      :disabled="disableFields"
      @change="updateRealizouOutroRaioTorax"
    />
    <v-text-field
      id="raioOutro"
      ref="raioOutro"
      :value="examesImagem.raioOutro"
      :rules="rules.raioOutro"
      class="pl-8"
      label="Especifique *"
      validate-on-blur
      :disabled="disableOutro"
      @input="updateRaioOutro"
    />
  </div>
</template>
<script>
import ExamesImagem from '@/entities/ExamesImagem';
import { required } from '@/validations/CommonValidations';

export default {
  props: {
    realizouExamesImagem: {
      type: Boolean,
      required: true,
    },
    examesImagem: {
      type: ExamesImagem,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    rules: {
      raioOutro: [],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.realizouExamesImagem;
    },
    disableOutro() {
      if (this.disabled) return true;
      return !this.examesImagem.realizouOutroRaioTorax || !this.realizouExamesImagem;
    },
  },
  methods: {
    validarRealizouExamesImagem() {
      this.$emit('update:validarRealizouExamesImagem');
    },
    updateRealizouOutroRaioTorax(realizouOutroRaioTorax) {
      this.examesImagem.realizouOutroRaioTorax = realizouOutroRaioTorax;
      this.$emit('update:raioNormal', false);
      this.updateRaioOutro();
      this.validarRaioOutro();
      this.validarRealizouExamesImagem();
    },
    updateRaioNormal(raioNormal) {
      this.$emit('update:raioNormal', raioNormal);
      this.$emit('update:raioInfiltradoIntersticial', false);
      this.$emit('update:raioConsolidacao', false);
      this.$emit('update:raioMisto', false);
      this.$emit('update:raioOutro', '');
      this.examesImagem.realizouOutroRaioTorax = false;
      this.validarRealizouExamesImagem();
    },
    updateRaioInfiltradoIntersticial(raioInfiltradoIntersticial) {
      this.$emit('update:raioInfiltradoIntersticial', raioInfiltradoIntersticial);
      this.$emit('update:raioNormal', false);
      this.validarRealizouExamesImagem();
    },
    updateRaioConsolidacao(raioConsolidacao) {
      this.$emit('update:raioConsolidacao', raioConsolidacao);
      this.$emit('update:raioNormal', false);
      this.validarRealizouExamesImagem();
    },
    updateRaioMisto(raioMisto) {
      this.$emit('update:raioMisto', raioMisto);
      this.$emit('update:raioNormal', false);
      this.validarRealizouExamesImagem();
    },
    updateRaioOutro(raioOutro) {
      this.$emit('update:raioOutro', raioOutro);
      this.$emit('update:raioNormal', false);
      this.validarRealizouExamesImagem();
    },
    validarRaioOutro() {
      this.$refs.raioOutro.validate();
    },
    requiredIfRealizouOutroRaioTorax(value) {
      if (!this.examesImagem.realizouOutroRaioTorax) {
        return true;
      }
      return required(value);
    },
  },
  created() {
    this.rules.raioOutro.push(this.requiredIfRealizouOutroRaioTorax);
  },
};
</script>
