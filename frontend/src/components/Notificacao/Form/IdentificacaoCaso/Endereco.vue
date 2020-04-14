<template>
  <div>
    <v-row dense>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          :value="suspeito.cep"
          label="CEP"
          v-mask="'##.###-###'"
          @input="updateCep"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          :value="suspeito.endereco"
          label="Endereço *"
          @input="updateEndereco"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          :value="suspeito.numero"
          label="Número *"
          @input="updateNumero"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-autocomplete
          :value="suspeito.bairroId"
          label="Bairro *"
          :items="bairros"
          item-text="value"
          item-value="key"
          @input="updateBairroId"
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
          disabled
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import Pessoa from '@/entities/Pessoa';

const MUNICIPIOS = ['Maringá'];
const BAIRROS = [
  { key: 'id_do_bairro_1', value: 'Zona 7' },
  { key: 'id_do_bairro_2', value: 'Zona 5' },
];

export default {
  directives: { mask },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  data: () => ({
    municipios: MUNICIPIOS,
    bairros: BAIRROS,
  }),
  methods: {
    updateCep(cep) {
      this.$emit('update:cep', cep);
    },
    updateEndereco(endereco) {
      this.$emit('update:endereco', endereco);
    },
    updateNumero(numero) {
      this.$emit('update:numero', numero);
    },
    updateBairroId(bairroId) {
      this.$emit('update:bairroId', bairroId);
    },
  },
};
</script>
