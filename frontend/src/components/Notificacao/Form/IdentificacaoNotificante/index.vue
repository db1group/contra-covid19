<template>
  <div class="px-2">
    <h4 class="primary--text font-weight-medium title">1. IDENTIFICAÇÃO DO NOTIFICANTE</h4>
    <div>
      <v-row dense>
        <v-col cols="12" sm="12">
          <v-select
            :value="unidadeSaudeId"
            :rules="rules.unidadeSaude"
            label="Unidade notificante *"
            :items="unidadesSaude"
            item-text="value"
            item-value="key"
            @input="updateUnidadeSaude"
            disabled
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
          <v-select
            :value="profissaoId"
            :rules="rules.profissaoId"
            label="Profissão do notificador *"
            :items="profissoes"
            item-text="value"
            item-value="key"
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

const UNIDADES_SAUDE = [
  { key: 1, value: 'Unidade Notificante de Teste - 1' },
];
const PROFISSOES = [
  { key: 1, value: 'Profissão de Teste - 1' },
  { key: 2, value: 'Profissão de Teste - 2' },
  { key: 3, value: 'Profissão de Teste - 3' },
];

export default {
  props: {
    notificacao: {
      type: Notificacao,
      required: true,
    },
  },
  data: () => ({
    unidadesSaude: UNIDADES_SAUDE,
    profissoes: PROFISSOES,
    unidadeSaudeId: 1,
    profissaoId: 1,
    rules: {
      unidadeSaude: [required],
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
  },
};
</script>
