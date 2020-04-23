<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :single-select="false"
      show-select
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
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-title>
          Cadastros
          <v-spacer></v-spacer>
          <v-text-field
            @input="filterSearch"
            append-icon="mdi-magnify"
            label="Pesquisar por Documento ou Nome"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-title>
          Ações em lote:
          <v-btn text small color="primary" @click="excluirLote()">EXCLUIR</v-btn>
        </v-card-title>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          v-if="isSecretariaSaude"
          text
          small
          color="primary"
          :to="{ name: 'evolucao-form', params: { id: item.id } }"
        >EVOLUÇÃO</v-btn>
        <v-btn text small color="red" @click="excluirItem(item)">EXCLUIR</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import NotificacaoService from '@/services/NotificacaoService';
import NotificacaoConsulta from '@/entities/NotificacaoConsulta';
import { isSecretariaSaude } from '@/validations/KeycloakValidations';

export default {
  data: () => ({
    sortBy: 'nome',
    sortDesc: false,
    singleSelect: false,
    selected: [],
    items: [],
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
    },
    totalNotif: 0,
    notificacoes: [],
    filter: '',
    filterCons: null,
    headers: [
      { text: 'Paciente', value: 'nome' },
      { text: 'Documento', value: 'documento' },
      { text: 'Notificação', value: 'dataNotificacao' },
      { text: 'Telefone', value: 'telefone' },
      { sortable: false, value: 'actions', width: '210px' },
    ],
  }),
  created() {
    this.consultarNotificacoes();
  },
  computed: {
    isSecretariaSaude() {
      return isSecretariaSaude(this);
    },
  },
  methods: {
    getColor(situacao) {
      switch (situacao) {
        case 'UTI':
          return '#FD3A5C';
        case 'Óbito':
          return 'black';
        case 'Leito comum':
          return '#FFB300';
        case 'Isolamento domiciliar':
          return '#64FFDA';
        default:
          return 'red';
      }
    },
    getTextColor(situacao) {
      switch (situacao) {
        case 'UTI':
        case 'Óbito':
          return 'white';
        default:
          return 'black';
      }
    },
    consultarNotificacoes({
      page, itemsPerPage, sortBy, sortDesc,
    } = this.options) {
      this.loading = true;
      const search = this.filter;
      NotificacaoService.findAll({
        page, itemsPerPage, sortBy, sortDesc, search,
      })
        .then(({ count, data }) => {
          this.totalNotif = count;
          this.notificacoes = data.map((d) => new NotificacaoConsulta(d).toRequestBody());
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaNotificacao', data.error);
        });
    },
    excluirItem({ id }) {
      NotificacaoService.delete(id)
        .then(() => {
          this.selected = this.selected.filter((n) => n.id !== id);
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
    excluirLote() {
      const ids = this.selected.map((n) => n.id);
      this.selected = [];
      NotificacaoService.deleteLote(ids)
        .then(() => {
          const left = this.notificacoes.length - ids.length;
          const page = left <= 0 ? 1 : this.options.page;
          this.options = { ...this.options, page };
          this.$emit('delete:notificacaoLote', 'Notificação em lote excluída com sucesso.');
        })
        .then(() => {
          this.consultarNotificacoes();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteNotificacaoLote', data.error);
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
  },
};
</script>
