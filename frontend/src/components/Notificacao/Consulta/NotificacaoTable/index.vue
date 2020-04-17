<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :single-select="false"
      show-select
      :headers="headers"
      :items="notificacoes"
      item-key="id"
      :options.sync="options"
      :server-items-length="totalNotif"
      :loading="loading"
      loading-text="Carregando as notificações."
      no-data-text="Não há notificações até o momento."
      no-results-text="Não há notificações com estes dados."
      :footer-props="{
        itemsPerPageText: 'Linhas por página'
      }"
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
      <template v-slot:item.situacao="{ item }">
        <v-chip class="d-block text-center" :color="getColor(item.situacao)" dark>{{ item.situacao }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text small color="red" @click="excluirItem(item)">EXCLUIR</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import NotificacaoService from '@/services/NotificacaoService';
import NotificacaoConsulta from '@/entities/NotificacaoConsulta';

export default {
  data: () => ({
    singleSelect: false,
    selected: [],
    items: [],
    loading: true,
    options: {},
    totalNotif: 0,
    notificacoes: [],
    filter: '',
    filterCons: null,
    headers: [
      { text: 'Paciente', value: 'nome' },
      { text: 'Documento', value: 'documento' },
      { text: 'Notificação', value: 'dataNotificacao' },
      { text: 'Telefone', value: 'telefone' },
      { text: 'Situação', value: 'situacao', width: '185px' },
      { sortable: false, value: 'actions' },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.consultarNotificacoes();
      },
      deep: true,
    },
  },
  mounted() {
    this.consultarNotificacoes();
  },
  methods: {
    getColor(situacao) {
      let color;
      switch (situacao) {
        case 'UTI': color = '#FD3A5C';
          break;
        case 'Óbito': color = 'black';
          break;
        case 'Leito comun': color = '#FFB300';
          break;
        case 'Isolamento domiciliar': color = '#64FFDA';
          break;
        default: color = 'red';
      }
      return color;
    },
    excluirItem({ id }) {
      NotificacaoService.delete(id).then(() => {
        this.selected = this.selected.filter((n) => n.id !== id);
        const page = this.notificacoes.length === 1 ? 1 : this.options.page;
        this.options = { ...this.options, page };
      });
    },
    excluirLote() {
      const ids = this.selected.map((n) => n.id);
      this.selected = [];
      NotificacaoService.deleteLote(ids).then(() => {
        const left = this.notificacoes.length - ids.length;
        console.log(left);
        const page = left <= 0 ? 1 : this.options.page;
        this.options = { ...this.options, page };
      });
    },
    consultarNotificacoes({ page, itemsPerPage } = this.options) {
      this.loading = true;
      setTimeout(() => {
        const search = this.filter;
        NotificacaoService.findAll({ page, itemsPerPage, search }).then(({ count, data }) => {
          this.totalNotif = count;
          this.notificacoes = data.map((d) => new NotificacaoConsulta(d).toRequestBody());
          this.loading = false;
        });
      }, 2000);
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
