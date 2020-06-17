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
    attempt: 0,
    intervalDownload: null,
  }),
  methods: {
    updateExportar(campo, valor) {
      this.exportar[campo] = valor;
    },
    downloadFile(filename) {
      NotificacaoService.downloadNotificacoes(filename)
        .then(() => {
          this.loading = false;
          clearInterval(this.intervalDownload);
          this.attempt = 0;
        })
        .catch(() => {
          this.attempt += 1;
          if (this.attempt === 5) {
            this.attempt = 0;
            clearInterval(this.intervalDownload);
            this.loading = false;
            this.showError = true;
            this.errorMessage = 'Não foi possível realizar o download. Tente novamente com um intervalo menor.';
          }
        });
    },
    send() {
      if (this.$refs.form.validate()) {
        if (!this.validarPeriodo()) {
          this.showError = true;
          this.errorMessage = 'A data inicial não pode ser posterior à data final e no período de 7 dias.';
          return;
        }

        this.loading = true;
        NotificacaoService.getDownloadFilename(this.exportar.toRequestBody())
          .then(({ filename }) => {
            this.attempt = 0;
            this.downloadFile(filename);
            this.intervalDownload = setInterval(() => this.downloadFile(filename), 5000);
          })
          .catch(() => {
            this.attempt = 0;
            this.showError = true;
            this.errorMessage = 'Não foi possível realizar o download.';
            this.loading = false;
          });
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
