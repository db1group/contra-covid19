<template>
  <div>
    <v-row dense>
      <v-col
        cols="12"
        sm="8"
      >
        <v-text-field
          :value="suspeito.endereco"
          :rules="rules.endereco"
          label="Endereço *"
          @input="updateEndereco"
          :disabled="disabled"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          :value="suspeito.numero"
          :rules="rules.numero"
          label="Número *"
          @input="updateNumero"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        sm="6"
      >
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
          :disabled="disabled"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
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
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <v-text-field
          :value="suspeito.complemento"
          label="Complemento"
          @input="updateComplemento"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          :value="suspeito.uf"
          label="UF"
          disabled
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          :value="suspeito.cep"
          label="CEP"
          v-mask="'########'"
          :rules="rules.cep"
          @input="updateCep"
          :disabled="disabled"
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
import MunicipioService from '@/services/MunicipioService';

export default {
  directives: { mask },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    searchMunicipio: '',
    searchBairro: '',
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
      bairroId: [required],
      municipioId: [required],
    },
  }),
  watch: {
    suspeito() {
      this.carregarDadosSuspeito();
    },
  },
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
    updateMunicipioId(municipioId) {
      if (this.view) {
        this.$emit('update:municipioId', municipioId);
        this.view = false;
      } else {
        this.$emit('update:bairroId', '');
        this.$emit('update:municipioId', municipioId);
        this.findBairros('');
      }
      this.updateUF(municipioId);
    },
    updateUF(municipioId) {
      const municipio = this.municipios.items.find((m) => m.id === municipioId);
      if (!municipio) {
        this.suspeito.uf = 'PR';
        return;
      }
      this.suspeito.uf = municipio.uf;
    },
    updateComplemento(complemento) {
      this.$emit('update:complemento', complemento);
    },
    findBairros(searchBairro = '') {
      if (this.suspeito.municipioId === '') return;
      this.bairros.loading = true;
      BairroService.findAllPorMunicipio(this.suspeito.municipioId, searchBairro)
        .then(({ data }) => {
          this.bairros.items = data;
        })
        .finally(() => { this.bairros.loading = false; });
    },
    searchBairros(search = '') {
      if (!search) return;
      if (search === this.searchBairro) return;
      this.searchBairro = search ? search.toUpperCase() : '';
      this.findBairros(this.searchBairro);
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
      if (!search) return;
      if (search === this.searchMunicipio) return;
      this.searchMunicipio = search ? search.toUpperCase() : '';
      this.findMunicipios(this.searchMunicipio);
    },
    carregarDadosSuspeito() {
      this.findBairros();
    },
  },
  created() {
    this.findMunicipios();
    this.findBairros();
  },
};
</script>
