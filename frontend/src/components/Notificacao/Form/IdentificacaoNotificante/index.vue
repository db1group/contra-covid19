<template>
  <div class="px-2">
    <h4 class="primary--text font-weight-medium title">1. IDENTIFICAÇÃO DO NOTIFICANTE</h4>
    <div>
      <v-row dense>
        <v-col cols="12" sm="12">
          <v-autocomplete
            :value="notificacao.unidadeSaudeId"
            :rules="rules.unidadeSaudeId"
            label="Unidade notificante *"
            :items="unidadesSaude.items"
            @update:search-input="searchUnidadeSaude"
            item-text="nome"
            item-value="id"
            :loading="unidadesSaude.loading"
            no-data-text="Unidade de saúde não encontrada"
            @input="updateUnidadeSaude"
            v-model="unidadeSelected"
            return-object
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            :value="notificacao.nomeNotificador"
            :rules="rules.nomeNotificador"
            label="Nome do notificador *"
            @input="updateNomeNotificador"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            :value="notificacao.profissaoId"
            :rules="rules.profissaoId"
            label="Profissão do notificador *"
            :items="profissoes.items"
            @update:search-input="searchProfissoes"
            item-text="nome"
            item-value="id"
            :loading="profissoes.loading"
            no-data-text="Profissão não encontrada"
            @input="updateProfissaoId"
            v-model="profissaoSelected"
            return-object
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { required, requiredObjectId } from '@/validations/CommonValidations';
import Notificacao from '@/entities/Notificacao';
import ProfissaoService from '@/services/ProfissaoService';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';

export default {
  props: {
    notificacao: {
      type: Notificacao,
      required: true,
    },
  },
  data: () => ({
    unidadesSaude: {
      items: [],
      loading: false,
    },
    searchUnidade: '',
    unidadeSelected: null,
    profissoes: {
      items: [],
      loading: true,
    },
    searchProfissao: '',
    profissaoSelected: null,
    rules: {
      unidadeSaudeId: [requiredObjectId],
      profissaoId: [requiredObjectId],
      nomeNotificador: [required],
    },
  }),
  methods: {
    updateUnidadeSaude(unidadeSaude) {
      this.searchUnidade = unidadeSaude.nome;
      this.$emit('update:unidadeSaudeId', unidadeSaude.id);
    },
    updateNomeNotificador(nomeNotificador) {
      this.$emit('update:nomeNotificador', nomeNotificador);
    },
    updateProfissaoId(profissao) {
      this.searchProfissao = profissao.nome;
      this.$emit('update:profissaoId', profissao.id);
    },
    findProfissoes(searchProfissao = '') {
      this.profissoes.loading = true;
      ProfissaoService.findAll(searchProfissao)
        .then(({ data }) => {
          this.profissoes.items = data;
        })
        .finally(() => { this.profissoes.loading = false; });
    },
    searchProfissoes(search = '') {
      if (search === this.searchProfissao) return;
      this.searchProfissao = search;
      this.findProfissoes(search);
    },
    findUnidadesDeSaude(searchUnidade = '') {
      if (this.unidadesSaude.loading) return;
      this.unidadesSaude.loading = true;
      UnidadeSaudeService.findAll(searchUnidade)
        .then(({ data }) => {
          this.unidadesSaude.items = data;
        })
        .finally(() => { this.unidadesSaude.loading = false; });
    },
    searchUnidadeSaude(search = '') {
      if (search === this.searchUnidade) return;
      this.searchUnidade = search;
      this.findUnidadesDeSaude(search);
    },
  },
  created() {
    this.findProfissoes();
    this.findUnidadesDeSaude('');
  },
};
</script>
