<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">
          Outros sinais e sintomas apresentados durante o período
        </label>
        <v-checkbox
          :input-value="sintomas.diarreia"
          label="DIARRÉIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateDiarreia"
        />
        <v-checkbox
          :input-value="sintomas.cefaleia"
          label="CEFALÉIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateCefaleia"
        />
        <v-checkbox
          :input-value="sintomas.nausea"
          label="NÁUSEA"
          hide-details
          :disabled="!sintomatico"
          @change="updateNausea"
        />
        <v-checkbox
          :input-value="sintomas.vomito"
          label="VÔMITO"
          hide-details
          :disabled="!sintomatico"
          @change="updateVomito"
        />
        <v-checkbox
          :input-value="existemOutrosSintomas"
          label="Outros sintomas"
          hide-details
          :disabled="!sintomatico"
          @change="updateExistemOutrosSintomas"
        />
        <v-text-field
          :value="sintomas.outros"
          class="pl-8"
          label="Especifique"
          :disabled="!existemOutrosSintomas || !sintomatico"
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
  },
  data: () => ({
    existemOutrosSintomas: false,
  }),
  methods: {
    updateExistemOutrosSintomas(existemOutrosSintomas) {
      this.existemOutrosSintomas = existemOutrosSintomas;
    },
    updateDiarreia(diarreia) {
      this.$emit('update:diarreia', diarreia);
    },
    updateCefaleia(cefaleia) {
      this.$emit('update:cefaleia', cefaleia);
    },
    updateNausea(nausea) {
      this.$emit('update:nausea', nausea);
    },
    updateVomito(vomito) {
      this.$emit('update:vomito', vomito);
    },
    updateOutros(outros) {
      this.$emit('update:outros', outros);
    },
  },
};
</script>
