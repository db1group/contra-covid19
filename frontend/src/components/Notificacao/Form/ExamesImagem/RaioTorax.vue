<template>
  <div>
    <label class="primary--text body-1 font-weight-bold">Raio do tórax</label>
    <v-checkbox
      :input-value="examesImagem.raioNormal"
      label="NORMAL"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateRaioNormal"
    />
    <v-checkbox
      :input-value="examesImagem.raioInfiltradoIntersticial"
      label="INFILTRADO INTERSTICIAL"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateRaioInfiltradoIntersticial"
    />
    <v-checkbox
      :input-value="examesImagem.raioConsolidacao"
      label="CONSOLIDAÇÃO"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateRaioConsolidacao"
    />
    <v-checkbox
      :input-value="examesImagem.raioMisto"
      label="MISTO"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateRaioMisto"
    />
    <v-checkbox
      :input-value="realizouOutroRaioTorax"
      label="OUTRO"
      hide-details
      :disabled="!realizouExamesImagem"
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
      :disabled="!realizouOutroRaioTorax || !realizouExamesImagem"
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
  },
  data: () => ({
    realizouOutroRaioTorax: false,
    rules: {
      raioOutro: [],
    },
  }),
  methods: {
    validarRealizouExamesImagem() {
      this.$emit('update:validarRealizouExamesImagem');
    },
    updateRealizouOutroRaioTorax(realizouOutroRaioTorax) {
      this.realizouOutroRaioTorax = realizouOutroRaioTorax;
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
      this.realizouOutroRaioTorax = false;
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
      if (!this.realizouOutroRaioTorax) {
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
