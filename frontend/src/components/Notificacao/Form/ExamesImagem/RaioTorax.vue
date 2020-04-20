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
      :value="examesImagem.raioOutro"
      :rules="rules.raioOutro"
      class="pl-8"
      label="Especifique"
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
    updateRealizouOutroRaioTorax(realizouOutroRaioTorax) {
      this.realizouOutroRaioTorax = realizouOutroRaioTorax;
    },
    updateRaioNormal(raioNormal) {
      this.$emit('update:raioNormal', raioNormal);
    },
    updateRaioInfiltradoIntersticial(raioInfiltradoIntersticial) {
      this.$emit('update:raioInfiltradoIntersticial', raioInfiltradoIntersticial);
    },
    updateRaioConsolidacao(raioConsolidacao) {
      this.$emit('update:raioConsolidacao', raioConsolidacao);
    },
    updateRaioMisto(raioMisto) {
      this.$emit('update:raioMisto', raioMisto);
    },
    updateRaioOutro(raioOutro) {
      this.$emit('update:raioOutro', raioOutro);
    },
    requiredIfRealizouOutroRaioTorax(value) {
      if (!this.realizouOutroRaioTorax) {
        return true;
      }
      return required(value, 'O campo é obrigatório.');
    },
  },
  created() {
    this.rules.raioOutro.push(this.requiredIfRealizouOutroRaioTorax);
  },
};
</script>
