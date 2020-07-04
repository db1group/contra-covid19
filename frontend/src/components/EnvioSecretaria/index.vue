<template>
  <v-container fluid>
    <v-data-table
      :items="itensPendentesEnvioSecretaria"
      :headers="headers"
      item-key="notificacaoId"
      :server-items-length="totalItens"
      :options.sync="options"
      @update:options="consultarItensPendentesEnvio"
      @input="selectItems"
      :loading="loading"
      loading-text="Carregando notificações pendentes."
      no-data-text="Não há notificações pendentes até o momento."
      no-results-text="Não há notificações pendentes com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [10, 30, 50, 100, 500, 1000],
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
                :loading="loadingEnvio"
              >Enviar notificações</v-btn>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col>
              <v-text-field
                @input="filterSearch"
                append-icon="mdi-magnify"
                label="Pesquisar por Paciente ou Documento"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
      </template>
      <template v-slot:item.numeroDocumento="{ item }">
        <span>{{item.tipoDocumento}}: {{ item.numeroDocumento | FormatDocument(item.tipoDocumento) }}</span>
      </template>
      <template v-slot:item.mensagem="{ item }">
        <span v-html="item.mensagem"></span>
      </template>
    </v-data-table>
  </v-container>
</template>
<style>
  .mensagemErro {
    color: #ff5252;
  }
  .mensagemSucesso {
    color: #4caf50;
    font-weight: bold;
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
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: ['createdAt'],
      sortDesc: 'true',
    },
    headers: [
      { text: 'Paciente', value: 'nomePaciente' },
      { text: 'Documento', value: 'numeroDocumento' },
      { text: 'Unidade Saúde', value: 'nomeUnidadeSaude' },
      { text: 'Retorno Envio', value: 'mensagem' },
    ],
    itensPendentesEnvioSecretaria: [],
    itensPendentesEnvioSecretariaSelected: [],
    buttomDisabled: false,
    filter: '',
    filterCons: null,
    loadingEnvio: false,
  }),
  methods: {
    consultarItensPendentesEnvio({ page, itemsPerPage } = this.options) {
      this.loading = true;
      const search = this.filter;
      NotificacaoPendenteEnvioService.findAll({ page, itemsPerPage, search })
        .then(({ count, data }) => {
          this.itensPendentesEnvioSecretaria = data.map((d) => new NotificacaoPendenteEnvioSecretaria(d));
          this.totalItens = count;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultarItensPendentesEnvio', data.error);
        })
        .finally(() => { this.loading = false; });
    },
    onClickEnviarNotificacoes() {
      this.loadingEnvio = true;
      const notificacaoIds = this.itensPendentesEnvioSecretariaSelected
        .map((data) => data.notificacaoId);

      this.buttomDisabled = true;
      NotificacaoPendenteEnvioService.sendAll(notificacaoIds).then(({ data }) => {
        data.forEach((notif) => {
          const item = this.itensPendentesEnvioSecretaria.find((i) => i.notificacaoId === notif.id);
          if (notif.message) {
            item.mensagem = `<span class="mensagemErro">${notif.message}</span>`;
            return;
          }
          if (notif.success) {
            item.mensagem = `<span class="mensagemSucesso">${notif.success}</span>`;
            return;
          }

          const { id, ...fields } = notif;
          const mensagem = Object.entries(fields).map(
            ([key, value]) => `<strong>${key}</strong> : ${value}<br/>`,
          ).join('');
          item.mensagem = `<span class="mensagemErro">${mensagem}</span>`;
        });

        if (data.length === 0 || data.filter((d) => d.success).length === data.length) {
          this.consultarItensPendentesEnvio();
          const msg = 'Notificações enviadas com sucesso.';
          this.$emit('success:enviarItensPendentesEnvio', msg);
        }
      }).catch((err) => {
        console.log(err);
        const { data } = err.response || {};
        this.$emit('erro:enviarItensPendentesEnvio', data.err);
      }).finally(() => {
        this.buttomDisabled = false;
        this.loadingEnvio = false;
      });
    },
    selectItems(items) {
      this.itensPendentesEnvioSecretariaSelected = items;
    },
    filterNotificacoes() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarItensPendentesEnvio({
          page: 1,
          itemsPerPage: this.options.itemsPerPage,
        });
      }, 500);
    },
    filterSearch(search) {
      this.filter = search;
      this.filterNotificacoes();
    },
  },
};
</script>
