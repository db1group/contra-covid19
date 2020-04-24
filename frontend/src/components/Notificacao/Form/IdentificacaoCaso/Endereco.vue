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
          @update:search-input="searchBairros"
          item-text="nome"
          item-value="id"
          :loading="bairros.loading"
          no-data-text="Bairro não encontrado"
          @input="updateBairroId"
          v-model="bairroSelected"
          return-object
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
        <v-autocomplete
          :value="suspeito.municipioId"
          :rules="rules.municipioId"
          label="Município *"
          :items="municipios.items"
          @update:search-input="searchMunicipios"
          item-text="nome"
          item-value="id"
          :loading="municipios.loading"
          no-data-text="Município não encontrado"
          @input="updateMunicipioId"
          v-model="municipioSelected"
          return-object
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import { required, minLength, requiredObjectId } from '@/validations/CommonValidations';
import Pessoa from '@/entities/Pessoa';
import BairroService from '@/services/BairroService';
import MunicipioService from '@/services/MunicipioService';

export default {
  directives: { mask },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  data: () => ({
    searchMunicipio: '',
    municipioSelected: null,
    searchBairro: '',
    bairroSelected: null,
    municipios: {
      items: [],
      loading: true,
    },
    bairros: {
      items: [],
      loading: true,
    },
    rules: {
      cep: [minLength(8)],
      endereco: [required],
      numero: [required],
      bairroId: [requiredObjectId],
      municipioId: [requiredObjectId],
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
    updateBairroId(bairro) {
      this.searchBairro = bairro.nome;
      this.$emit('update:bairroId', bairro.id);
    },
    updateMunicipioId(municipio) {
      this.searchMunicipio = municipio.nome;
      this.$emit('update:municipioId', municipio.id);
      this.updateBairroId(null);
    },
    findBairros(searchBairro = '') {
      this.bairros.loading = true;
      BairroService.findAllPorMunicipio(this.suspeito.municipioId, searchBairro)
        .then(({ data }) => {
          this.bairros.items = data;
        })
        .finally(() => { this.bairros.loading = false; });
    },
    searchBairros(search = '') {
      if (search === this.searchBairro) return;
      this.searchBairro = search;
      this.findBairros(search);
    },
    findMunicipios(searchMunicipio = '') {
      this.municipios.loading = true;
      MunicipioService.findAll(searchMunicipio)
        .then(({ data }) => {
          this.municipios.items = data;
        })
        .finally(() => { this.municipios.loading = false; });
    },
    searchMunicipios(search = '') {
      if (search === this.searchMunicipio) return;
      this.searchMunicipio = search;
      this.findMunicipios(search);
    },
  },
  created() {
    this.findBairros('');
    this.findMunicipios('');
  },
};
</script>
