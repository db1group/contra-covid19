<template>
  <v-container fluid>
    <v-data-table
      :items="itensPendentesEnvioSecretaria"
      :headers="headers"
      item-key="notificacaoId"
      :server-items-length="totalItens"
      @update:options="consultarItensPendentesEnvio"
      @input="selectItems"
      :loading="loading"
      loading-text="Carregando notificações pendentes."
      no-data-text="Não há notificações pendentes até o momento."
      no-results-text="Não há notificações pendentes com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [1000],
      }"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-title>
          <v-row>
            <v-col cols="4">
              <v-btn
                rounded
                color="primary"
                :disabled="itensPendentesEnvioSecretariaSelected.length <= 0 || buttomDisabled"
                @click="onClickEnviarNotificacoes"
              >Enviar notificações</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </template>
    </v-data-table>
  </v-container>
</template>
<style scoped>
  .hideCreatedAt {
    display: none;
  }
</style>
<script>
import NotificacaoPendenteEnvioService from '@/services/NotificacaoPendenteEnvioService';
import NotificacaoPendenteEnvioSecretaria from '@/entities/NotificacaoPendenteEnvioSecretaria';

export default {
  directives: { },
  components: { },
  data: () => ({
    totalItens: 0,
    loading: true,
    headers: [
      { text: 'Paciente', value: 'nomePaciente' },
      { text: 'Unidade Saúde', value: 'nomeUnidadeSaude' },
    ],
    itensPendentesEnvioSecretaria: [],
    itensPendentesEnvioSecretariaSelected: [],
    buttomDisabled: false,
  }),
  methods: {
    consultarItensPendentesEnvio() {
      this.loading = true;
      NotificacaoPendenteEnvioService.findAll()
        .then(({ data }) => {
          this.itensPendentesEnvioSecretaria = data.map((d) => new NotificacaoPendenteEnvioSecretaria(d));
          this.totalItens = this.itensPendentesEnvioSecretaria.length;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultarItensPendentesEnvio', data.error);
        })
        .finally(() => { this.loading = false; });
    },
    onClickEnviarNotificacoes() {
      const notificacaoIds = this.itensPendentesEnvioSecretariaSelected
        .map((data) => data.notificacaoId);

      this.buttomDisabled = true;

      NotificacaoPendenteEnvioService.sendAll(notificacaoIds).then(() => {
        this.consultarItensPendentesEnvio();
        const msg = 'Notificações enviadas com sucesso.';
        this.$emit('success:enviarItensPendentesEnvio', msg);
      }).catch((err) => {
        const { data } = err.response || {};
        this.$emit('erro:enviarItensPendentesEnvio', data.err);
      }).finally(() => { this.buttomDisabled = false; });

      console.log(notificacaoIds);
    },
    selectItems(items) {
      this.itensPendentesEnvioSecretariaSelected = items;
    },
  },
};
</script>
