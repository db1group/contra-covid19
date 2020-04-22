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
            item-text="nome"
            item-value="id"
            :loading="unidadesSaude.loading"
            no-data-text="Unidade de saúde não encontrada"
            @input="updateUnidadeSaude"
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
            item-text="nome"
            item-value="id"
            :loading="profissoes.loading"
            no-data-text="Profissão não encontrada"
            @input="updateProfissaoId"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { required } from '@/validations/CommonValidations';
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
      loading: true,
    },
    profissoes: {
      items: [],
      loading: true,
    },
    rules: {
      unidadeSaudeId: [required],
      profissaoId: [required],
      nomeNotificador: [required],
    },
  }),
  methods: {
    updateUnidadeSaude(unidadeSaudeId) {
      this.$emit('update:unidadeSaudeId', unidadeSaudeId);
    },
    updateNomeNotificador(nomeNotificador) {
      this.$emit('update:nomeNotificador', nomeNotificador);
    },
    updateProfissaoId(profissaoId) {
      this.$emit('update:profissaoId', profissaoId);
    },
    findProfissoes() {
      this.profissoes.loading = true;
      ProfissaoService.findAll().then(({ data }) => {
        this.profissoes = {
          items: data,
          loading: false,
        };
      });
    },
    findUnidadesDeSaude() {
      this.unidadesSaude.loading = true;
      UnidadeSaudeService.findAll().then(({ data }) => {
        this.unidadesSaude = {
          items: data,
          loading: false,
        };
      });
    },
  },
  created() {
    this.findProfissoes();
    this.findUnidadesDeSaude();
  },
};
</script>
