<template>
  <v-container fluid>
    <confirm-dialog
      v-model="removingNotificationDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> a notificação?
        </div>
      </div>
    </confirm-dialog>
    <v-data-table
      :headers="headers"
      :items="notificacoes"
      item-key="id"
      :server-items-length="totalNotif"
      :options.sync="options"
      @update:options="consultarNotificacoes"
      :loading="loading"
      loading-text="Carregando as notificações."
      no-data-text="Não há notificações até o momento."
      no-results-text="Não há notificações com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [10, 30, 50, 100],
      }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-title>
          Cadastros
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="4">
              <v-select
                :items="situacaoNotif"
                :value="filtroStatus"
                label="Situação"
                item-text="value"
                item-value="key"
                @input="updateFiltroSituacao"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                @input="filterSearch"
                append-icon="mdi-magnify"
                label="Pesquisar por Documento ou Nome"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row justify="end" align="center" dense>
          <v-col v-if="isPermiteVisualizar(item)">
            <v-btn
              text
              small
              color="#B8860B"
              :to="{ name: 'notificacao-view', params: { id: item.id } }"
            >VISUALIZAR</v-btn>
          </v-col>
          <v-col v-if="isPermiteEvoluir(item)">
            <v-btn
              text
              small
              color="primary"
              :to="{ name: 'evolucao-form', params: { id: item.id } }"
            >EVOLUÇÃO</v-btn>
          </v-col>
          <v-col v-if="isPermiteExcluir()">
            <v-btn text small color="red" @click="showExclusionConfirmDialog(item)">EXCLUIR</v-btn>
          </v-col>
        </v-row>
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
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import NotificacaoService from '@/services/NotificacaoService';
import keycloak from '@/services/KeycloakService';
import NotificacaoConsulta from '@/entities/NotificacaoConsulta';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';

const SITUACAO_NOTIFICACAO = [
  { key: '', value: 'TODAS' },
  { key: 'ABERTA', value: 'ABERTA' },
  { key: 'ENCERRADA', value: 'ENCERRADA' },
];

export default {
  components: { ConfirmDialog },
  data: () => ({
    situacaoNotif: SITUACAO_NOTIFICACAO,
    filtroStatus: '',
    items: [],
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['createdAt'],
      sortDesc: 'true',
    },
    totalNotif: 0,
    notificacoes: [],
    filter: '',
    filterCons: null,
    headers: [
      { text: 'Paciente', value: 'nome' },
      { text: 'Data Notificação', value: 'dataNotificacao' },
      { text: 'Unidade Notificadora', value: 'unidade' },
      { text: 'Situação', value: 'status' },
      { sortable: false, value: 'actions', width: '240px' },
    ],
    removingNotificationDialog: {
      showDialog: false,
      id: null,
    },
    unidadesSaudeUserLogged: [],
    isSecretariaSaude: false,
  }),
  methods: {
    consultarNotificacoes({
      page, itemsPerPage, sortBy = 'createdAt', sortDesc = 'true',
    } = this.options) {
      this.loading = true;
      const search = this.filter;
      const status = this.filtroStatus;
      NotificacaoService.findAll({
        page, itemsPerPage, sortBy, sortDesc, search, status,
      })
        .then(({ count, data }) => {
          this.totalNotif = count;
          this.notificacoes = data.map((d) => new NotificacaoConsulta(d));
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaNotificacao', data.error);
        });
    },
    showExclusionConfirmDialog({ id }) {
      this.removingNotificationDialog.showDialog = true;
      this.removingNotificationDialog.id = id;
    },
    confirmExclusion() {
      this.excluirItem(this.removingNotificationDialog.id);
    },
    excluirItem(id) {
      NotificacaoService.delete(id)
        .then(() => {
          const page = this.notificacoes.length === 1 ? 1 : this.options.page;
          this.options = { ...this.options, page };
          this.$emit('delete:notificacao', 'Notificação excluída com sucesso.');
        })
        .then(() => {
          this.consultarNotificacoes();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteNotificacao', data.error);
        });
    },
    filterNotificacoes() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarNotificacoes({
          page: 1,
          itemsPerPage: this.options.itemsPerPage,
        });
      }, 500);
    },
    filterSearch(search) {
      this.filter = search;
      this.filterNotificacoes();
    },
    isPermiteEvoluir(item) {
      return item.status === 'ABERTA' && this.isSecretariaSaude;
    },
    isPermiteVisualizar(item) {
      return this.isUnidadeSaudePermitidaUserLogged(item.unidadeSaudeId) || isSecretariaSaude(this);
    },
    isPermiteExcluir() {
      return isSecretariaSaude(this);
    },
    updateFiltroSituacao(status) {
      this.filtroStatus = status;
      this.options = { ...this.options, page: 1 };
      this.consultarNotificacoes();
    },
    isUnidadeSaudePermitidaUserLogged(unidadeSaudeId) {
      return this.unidadesSaudeUserLogged.some((data) => data.id === unidadeSaudeId);
    },
    consultarUnidadesSaudeUsuario() {
      UnidadeSaudeService.findByUserEmail(keycloak.tokenParsed.email)
      .then(({ data }) => {
        this.unidadesSaudeUserLogged = data;
      })
      .finally(() => {
        this.consultarNotificacoes();
      });  
    },
  },
  created() {    
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    this.consultarUnidadesSaudeUsuario();    
  },
};
</script>
