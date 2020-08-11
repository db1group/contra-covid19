<template>
  <section style="margin-top: 35px;">
    <header-title title="Exportar Notificação" :showIcon="false" />
    <base-page>
      <exportar
        :exportar="exportar"
        :loading="loading"
        @update:dataInicial="updateExportar('dataInicial', $event)"
        @update:dataFinal="updateExportar('dataFinal', $event)"
        @update:dataEvolucaoInicial="updateExportar('dataEvolucaoInicial', $event)"
        @update:dataEvolucaoFinal="updateExportar('dataEvolucaoFinal', $event)"
        @click="send"
      ></exportar>
      <v-snackbar v-model="showError" color="error" bottom>{{errorMessage}}</v-snackbar>
    </base-page>
  </section>
</template>
<script>

import BasePage from '@/components/commons/BasePage.vue';
import Exportar from '@/components/Notificacao/Exportar/Index.vue';
import NotificacaoExportar from '@/entities/NotificacaoExportar';
import NotificacaoService from '@/services/NotificacaoService';
import DateService from '@/services/DateService';
import keycloak from '@/services/KeycloakService';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';

export default {
  components: {
    BasePage,
    Exportar,
    HeaderTitle,
  },
  data: () => ({
    exportar: new NotificacaoExportar(),
    showError: false,
    loading: false,
    errorMessage: '',
  }),
  methods: {
    updateExportar(campo, valor) {
      console.log(campo, valor, typeof valor);
      this.exportar[campo] = valor;
    },
    async tratarErro(response) {
      const errorString = await response.data.text() || {};
      const { error } = JSON.parse(errorString);
      this.showError = true;
      this.errorMessage = error || 'Não foi possível realizar o download.';
    },
    send() {
      if (!this.validarPeriodo()) {
        this.showError = true;
        this.errorMessage = 'A data inicial não pode ser posterior à data final e no período de 31 dias.';
        return;
      }

      this.loading = true;
      NotificacaoService.downloadNotificacoesCSV(this.exportar.toRequestBody())
        .catch(async ({ response }) => { await this.tratarErro(response); })
        .finally(() => { this.loading = false; });
    },
    validarPeriodo() {
      const {
        dataInicial,
        dataFinal,
        dataEvolucaoInicial,
        dataEvolucaoFinal,
      } = this.exportar;
      if (dataInicial && dataFinal) {
        return DateService.isLesserEqualsThanMaximumDateOr31Days(dataInicial, dataFinal);
      }
      return DateService.isLesserEqualsThanMaximumDateOr31Days(dataEvolucaoInicial, dataEvolucaoFinal);
    },
    isSecretariaSaude() {
      return keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    },
  },
  created() {
    if (!this.isSecretariaSaude()) {
      this.$router.push({
        name: 'home-page',
      });
    }
  },
};
</script>
