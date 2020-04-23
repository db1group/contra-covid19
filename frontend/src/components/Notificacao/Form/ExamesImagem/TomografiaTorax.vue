<template>
  <div>
    <label class="primary--text body-1 font-weight-bold">Tomografia do tórax</label>
    <v-checkbox
      :value="examesImagem.tomografiaNormal"
      label="NORMAL"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateTomografiaNormal"
    />
    <v-checkbox
      :value="examesImagem.tomografiaVidroFoscoPredominioPerifericoBasal"
      label="VIDRO FOSCO DE PREDOMÍNIO PERIFÉRICO E BASAL"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateTomografiaVidroFoscoPredominioPerifericoBasal"
    />
    <v-checkbox
      :value="examesImagem.tomografiaAusenciaDerramePleural"
      label="AUSÊNCIA DE DERRAME PLEURAL"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateTomografiaAusenciaDerramePleural"
    />
    <v-checkbox
      :value="examesImagem.tomografiaAusenciaLinfonodoMediastenal"
      label="AUSÊNCIA DE LINFONODO MEDIASTENAL"
      hide-details
      :disabled="!realizouExamesImagem"
      @change="updateTomografiaAusenciaLinfonodoMediastenal"
    />
    <v-checkbox
      :input-value="realizouOutraTomografiaTorax"
      label="OUTRO"
      hide-details
      :disabled="!realizouExamesImagem"
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
      :disabled="!realizouOutraTomografiaTorax || !realizouExamesImagem"
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
  },
  data: () => ({
    realizouOutraTomografiaTorax: false,
    rules: {
      tomografiaOutro: [],
    },
  }),
  methods: {
    validarRealizouExamesImagem() {
      this.$emit('update:validarRealizouExamesImagem');
    },
    updateRealizouOutraTomografiaTorax(realizouOutraTomografiaTorax) {
      this.realizouOutraTomografiaTorax = realizouOutraTomografiaTorax;
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
      this.realizouOutraTomografiaTorax = false;
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
      if (!this.realizouOutraTomografiaTorax) {
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
