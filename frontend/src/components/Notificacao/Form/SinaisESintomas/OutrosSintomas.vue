<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1">
          Outros sinais e sintomas apresentados durante o período
        </label>
        <v-checkbox
          label="DIARRÉIA"
          hide-details
        />
        <v-checkbox
          label="CEFALÉIA"
          hide-details
        />
        <v-checkbox
          label="NÁUSEA"
          hide-details
        />
        <v-checkbox
          label="VÔMITO"
          hide-details
        />
        <v-checkbox
          :input-value="existemOutrosSintomas"
          label="Outros sintomas"
          hide-details
          @change="updateExistemOutrosSintomas"
        />
        <v-text-field
          class="pl-8"
          label="Especifique"
          :disabled="!existemOutrosSintomas"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    existemOutrosSintomas: false,
  }),
  methods: {
    updateExistemOutrosSintomas(existemOutrosSintomas) {
      this.existemOutrosSintomas = existemOutrosSintomas;
    },
  },
};
</script>
