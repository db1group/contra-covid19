<template>
  <div class="mt-2">
    <v-row no-gutters>
      <v-col cols="12">
        <label class="primary--text body-1">Sintomas</label>
        <v-checkbox
          :input-value="existemSintomas"
          label="Sintomático"
          hide-details
          @change="updateExistemSintomas"
        />
      </v-col>
      <v-col
        class="pl-8"
        cols="12"
        sm="8"
        md="7"
      >
        <v-text-field
          label="Data de início dos sintomas *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          :disabled="!existemSintomas"
        />
      </v-col>
      <v-col
        class="pl-8"
        cols="12"
        sm="8"
        md="7"
      >
        <v-text-field
          label="Temperatura *"
          suffix="°C"
          v-mask="'##,#'"
          :disabled="!existemSintomas"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
  data: () => ({
    existemSintomas: false,
  }),
  methods: {
    updateExistemSintomas(existemSintomas) {
      this.existemSintomas = existemSintomas;
    },
  },
};
</script>
