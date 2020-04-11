<template>
  <div>
    <v-row dense>
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-text-field
          label="CPF"
          v-mask="'###.###.###-##'"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          label="Nome completo *"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-radio-group class="mt-0">
          <template v-slot:label>
            <label class="primary--text body-1 font-weight-bold">Sexo</label>
          </template>
          <v-radio label="Masculino" value="M"/>
          <v-radio label="Feminino" value="F"/>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-text-field
          label="Data de nascimento *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
};
</script>
