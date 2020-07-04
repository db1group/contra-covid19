<template>
  <div>
    <v-row dense>
      <v-col cols="12" sm="8">
        <v-text-field
          :value="suspeito.endereco"
          :rules="rules.endereco"
          label="Endereço *"
          @input="updateEndereco"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="12" sm="4">
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
      <v-col cols="12" sm="6">
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
          :disabled="disabled || possuiFechamento"
          persistent-hint
          :hint="hintPossuiFechamento()"
        />
      </v-col>
      <v-col cols="12" sm="6">
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
          :disabled="disableBairro"
          @input="updateBairroId"
          persistent-hint
          :hint="hintPossuiFechamento()"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="9">
        <v-text-field
          :value="suspeito.complemento"
          label="Complemento"
          :rules="rules.complemento"
          @input="updateComplemento"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field :value="suspeito.uf" label="UF" disabled />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="9">
        <v-autocomplete
          autocomplete="new-password"
          :value="suspeito.paisId"
          :rules="rules.paisId"
          label="País *"
          :items="paises.items"
          @update:search-input="searchPaises"
          item-text="nome"
          item-value="id"
          :loading="paises.loading"
          no-data-text="País não encontrado"
          :disabled="disabled"
          @input="updatePaisId"
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
import { required, minLength, notBrasil } from '@/validations/CommonValidations';
import Pessoa from '@/entities/Pessoa';
import BairroService from '@/services/BairroService';
import MunicipioService from '@/services/MunicipioService';
import PaisService from '@/services/PaisService';

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
    possuiFechamento: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    searchMunicipio: null,
    searchBairro: null,
    searchPais: null,
    municipios: {
      items: [],
      loading: true,
    },
    bairros: {
      items: [],
      loading: false,
    },
    paises: {
      items: [],
      loading: false,
    },
    rules: {
      cep: [minLength(8)],
      endereco: [required, minLength(3)],
      numero: [required],
      bairroId: [required],
      municipioId: [required],
      complemento: [minLength(3)],
      paisId: [],
    },
  }),
  watch: {
    suspeito(suspeito) {
      this.carregarDadosSuspeito(suspeito);
    },
  },
  computed: {
    disableBairro() {
      if (this.disabled) return true;
      if (this.possuiFechamento) return true;
      return !this.suspeito.municipioId;
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
      this.updateRuleComplemento(bairroId);
      this.$emit('update:bairroId', bairroId);
    },
    updateMunicipioId(municipioId) {
      this.$emit('update:bairroId', '');
      this.$emit('update:municipioId', municipioId);
      this.findBairros();
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
      if (!this.suspeito.municipioId) return;
      this.bairros.loading = true;
      BairroService.findAllPorMunicipio(this.suspeito.municipioId, searchBairro)
        .then(({ data }) => {
          this.bairros.items = data;
        })
        .finally(() => { this.bairros.loading = false; });
    },
    searchBairros(search = '') {
      if (search === this.searchBairro) return;
      this.searchBairro = search ? search.trim().toUpperCase() : '';
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
      if (search === this.searchMunicipio) return;
      this.searchMunicipio = search ? search.trim().toUpperCase() : '';
      this.findMunicipios(this.searchMunicipio);
    },
    carregarDadosSuspeito(suspeito) {
      this.findMunicipios(suspeito.municipioNome);
      this.findBairros(suspeito.bairroNome);
      this.findPaises(suspeito.paisNome);
    },
    requiredBairroGeral(value) {
      return required(value, 'Complemento é obrigatório para o bairro GERAL.');
    },
    updateRuleComplemento(bairroId) {
      const bairro = this.bairros.items.find((b) => b.id === bairroId);
      this.rules.complemento.pop();
      if (!bairro) return;
      if (bairro.nome === 'GERAL') {
        this.rules.complemento.push(this.requiredBairroGeral);
      }
    },
    hintPossuiFechamento() {
      return this.possuiFechamento ? 'Não é possivel alterar pois já foi realizado o fechamento.' : '';
    },
    searchPaises(search = '') {
      if (search === this.searchPais) return;
      this.searchPais = search ? search.trim().toUpperCase() : '';
      this.findPaises(this.searchPais);
    },
    findPaises(searchPais = '') {
      this.paises.loading = true;
      PaisService.findAll(searchPais)
        .then(({ data }) => {
          this.paises.items = data;
        })
        .finally(() => { this.paises.loading = false; });
    },
    updatePaisId(paisId) {
      this.$emit('update:paisId', paisId);
    },
    notBrasilIfEstrangeiro(value) {
      if (this.suspeito.tipoClassificacaoPessoa !== 'ESTRANGEIRO') {
        return true;
      }
      return notBrasil(value);
    },
  },
  created() {
    this.rules.paisId.push(required, this.notBrasilIfEstrangeiro);
    this.findMunicipios();
    this.findBairros();
    this.findPaises();
  },
};
</script>
