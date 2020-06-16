<template>
  <section style="margin-top: 75px;">
    <base-page>
      <v-container fluid>
        <v-row justify="space-between" align="center">
          <!-- <v-form ref="form" class="col-12"> -->
          <v-form ref="form">
            <exportar
              :exportar="exportar"
              :loading="loading"
              @update:dataInicial="updateExportar('dataInicial', $event)"
              @update:dataFinal="updateExportar('dataFinal', $event)"
              @click="send"
            ></exportar>
          </v-form>
          <!-- </v-form> -->
        </v-row>
      </v-container>
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

export default {
  components: {
    BasePage,
    Exportar,
  },
  data: () => ({
    exportar: new NotificacaoExportar(),
    showError: false,
    loading: false,
    errorMessage: '',
  }),
  methods: {
    updateExportar(campo, valor) {
      this.exportar[campo] = valor;
    },
    send() {
      if (this.$refs.form.validate()) {
        if (!this.validarPeriodo()) {
          this.showError = true;
          this.errorMessage = 'A data inicial não pode ser posterior à data final e no período de 7 dias.';
          return;
        }

        this.loading = true;
        NotificacaoService.downloadNotificacoes(this.exportar.toRequestBody())
          .catch(() => {
            this.showError = true;
            this.errorMessage = 'Não foi possível realizar o download. Tente novamente com um intervalo menor.';
          })
          .finally(() => { this.loading = false; });
      }
    },
    validarPeriodo() {
      const { dataInicial, dataFinal } = this.exportar;
      return DateService.isLesserEqualsThanMaximumDateOr7Days(dataInicial, dataFinal);
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
