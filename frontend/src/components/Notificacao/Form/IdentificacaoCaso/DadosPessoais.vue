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
          :value="suspeito.nome"
          label="Nome completo *"
          @input="updateNome"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          :value="suspeito.sexo"
          class="mt-0"
          @change="updateSexo"
        >
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
          :value="suspeito.dataDeNascimento"
          label="Data de nascimento *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          @input="updateDataDeNascimento"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import Pessoa from '@/entities/Pessoa';

export default {
  directives: { mask },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  methods: {
    updateNome(nome) {
      this.$emit('update:nome', nome);
    },
    updateSexo(sexo) {
      this.$emit('update:sexo', sexo);
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
  },
};
</script>
