<template>
  <div>
    <v-row dense>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          label="CEP"
          v-mask="'##.###-###'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          label="Endereço *"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          label="Número *"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          label="Bairro *"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="3">
        <v-select
          value="PR"
          label="UF *"
          :items="['PR']"
          disabled
        />
      </v-col>
      <v-col cols="9">
        <v-select
          label="Município *"
          :items="municipios"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';

const MUNICIPIOS = ['Maringá', 'Sarandi', 'Paiçandu'];

export default {
  directives: { mask },
  data: () => ({
    municipios: MUNICIPIOS,
  }),
};
</script>
