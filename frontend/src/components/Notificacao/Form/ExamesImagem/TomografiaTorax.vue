<template>
  <div>
    <label class="primary--text body-1 font-weight-bold">Tomografia do tórax</label>
    <v-checkbox
      :value="examesImagem.tomografiaNormal"
      label="NORMAL"
      hide-details
      :disabled="disableFields"
      @change="updateTomografiaNormal"
    />
    <v-checkbox
      :value="examesImagem.tomografiaVidroFoscoPredominioPerifericoBasal"
      label="VIDRO FOSCO DE PREDOMÍNIO PERIFÉRICO E BASAL"
      hide-details
      :disabled="disableFields"
      @change="updateTomografiaVidroFoscoPredominioPerifericoBasal"
    />
    <v-checkbox
      :value="examesImagem.tomografiaAusenciaDerramePleural"
      label="AUSÊNCIA DE DERRAME PLEURAL"
      hide-details
      :disabled="disableFields"
      @change="updateTomografiaAusenciaDerramePleural"
    />
    <v-checkbox
      :value="examesImagem.tomografiaAusenciaLinfonodoMediastenal"
      label="AUSÊNCIA DE LINFONODO MEDIASTENAL"
      hide-details
      :disabled="disableFields"
      @change="updateTomografiaAusenciaLinfonodoMediastenal"
    />
    <v-checkbox
      :input-value="examesImagem.realizouOutraTomografiaTorax"
      label="OUTRO"
      hide-details
      :disabled="disableFields"
      @change="updateRealizouOutraTomografiaTorax"
    />
    <v-text-field
      id="tomografiaOutro"
      ref="tomografiaOutro"
      :value="examesImagem.tomografiaOutro"
      :rules="rules.tomografiaOutro"
      class="pl-8"
      label="Especifique *"
      validate-on-blur
      :disabled="disableOutro"
      @input="updateTomografiaOutro"
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
      tomografiaOutro: [],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.realizouExamesImagem;
    },
    disableOutro() {
      if (this.disabled) return true;
      return !this.examesImagem.realizouOutraTomografiaTorax || !this.realizouExamesImagem;
    },
  },
  methods: {
    validarRealizouExamesImagem() {
      this.$emit('update:validarRealizouExamesImagem');
    },
    updateRealizouOutraTomografiaTorax(realizouOutraTomografiaTorax) {
      this.$emit('update:realizouOutraTomografiaTorax', realizouOutraTomografiaTorax);
      this.$emit('update:tomografiaNormal', false);
      this.updateTomografiaOutro();
      this.validarTomografiaOutro();
      this.validarRealizouExamesImagem();
    },
    updateTomografiaNormal(tomografiaNormal) {
      this.$emit('update:tomografiaNormal', tomografiaNormal);
      this.$emit('update:tomografiaVidroFoscoPredominioPerifericoBasal', false);
      this.$emit('update:tomografiaAusenciaDerramePleural', false);
      this.$emit('update:tomografiaAusenciaLinfonodoMediastenal', false);
      this.$emit('update:tomografiaOutro', '');
      this.$emit('update:realizouOutraTomografiaTorax', false);
      this.validarRealizouExamesImagem();
    },
    updateTomografiaVidroFoscoPredominioPerifericoBasal(tomografiaVidroFoscoPredominioPerifericoBasal) {
      this.$emit('update:tomografiaVidroFoscoPredominioPerifericoBasal', tomografiaVidroFoscoPredominioPerifericoBasal);
      this.$emit('update:tomografiaNormal', false);
      this.validarRealizouExamesImagem();
    },
    updateTomografiaAusenciaDerramePleural(tomografiaAusenciaDerramePleural) {
      this.$emit('update:tomografiaAusenciaDerramePleural', tomografiaAusenciaDerramePleural);
      this.$emit('update:tomografiaNormal', false);
      this.validarRealizouExamesImagem();
    },
    updateTomografiaAusenciaLinfonodoMediastenal(tomografiaAusenciaLinfonodoMediastenal) {
      this.$emit('update:tomografiaAusenciaLinfonodoMediastenal', tomografiaAusenciaLinfonodoMediastenal);
      this.$emit('update:tomografiaNormal', false);
      this.validarRealizouExamesImagem();
    },
    updateTomografiaOutro(tomografiaOutro) {
      this.$emit('update:tomografiaOutro', tomografiaOutro);
      this.$emit('update:tomografiaNormal', false);
      this.validarRealizouExamesImagem();
    },
    validarTomografiaOutro() {
      this.$refs.tomografiaOutro.validate();
    },
    requiredIfRealizouOutraTomografiaTorax(value) {
      if (!this.examesImagem.realizouOutraTomografiaTorax) {
        return true;
      }
      return required(value);
    },
  },
  created() {
    this.rules.tomografiaOutro.push(this.requiredIfRealizouOutraTomografiaTorax);
  },
};
</script>
