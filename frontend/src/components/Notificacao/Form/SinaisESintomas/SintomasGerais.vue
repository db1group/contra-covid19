<template>
  <div class="mt-2">
    <v-row no-gutters>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">Sintomas</label>
        <v-checkbox
          :input-value="sintomatico"
          label="Sintomático"
          hide-details
          @change="updateSintomatico"
        />
      </v-col>
      <v-col
        class="pl-8"
        cols="12"
        sm="8"
        md="7"
      >
        <v-text-field
          :value="dataInicioDosSintomas"
          label="Data de início dos sintomas *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          :disabled="!sintomatico"
          @input="updateDataInicioDosSintomas"
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
          :disabled="!sintomatico"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
  props: {
    sintomatico: {
      type: Boolean,
      required: true,
    },
    dataInicioDosSintomas: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateSintomatico(sintomatico) {
      this.$emit('update:sintomatico', sintomatico);
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.$emit('update:dataInicioDosSintomas', dataInicioDosSintomas);
    },
  },
};
</script>
