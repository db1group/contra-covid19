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
          v-mask="'########'"
          :rules="rules.cep"
          @input="updateCep"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          :value="suspeito.endereco"
          :rules="rules.endereco"
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
          :rules="rules.numero"
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
          :rules="rules.bairroId"
          label="Bairro *"
          :items="bairros.items"
          item-text="nome"
          item-value="id"
          :loading="bairros.loading"
          no-data-text="Bairro não encontrado"
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
import { required, minLength } from '@/validations/CommonValidations';
import Pessoa from '@/entities/Pessoa';
import BairroService from '@/services/BairroService';

const MUNICIPIOS = ['Maringá'];

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
    bairros: {
      items: [],
      loading: true,
    },
    rules: {
      cep: [minLength(8)],
      endereco: [required],
      numero: [required],
      bairroId: [required],
    },
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
    findBairros() {
      this.bairros.loading = true;
      BairroService.findAll().then(({ data }) => {
        this.bairros = {
          items: data,
          loading: false,
        };
      });
    },
  },
  created() {
    this.findBairros();
  },
};
</script>
