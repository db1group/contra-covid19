<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
    :value="value"
    @input="input"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Detalhes</v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-data-table
          :headers="headers"
          :items="detalhesFechamento"
          item-key="id"
          :server-items-length="totalNotif"
          :options.sync="options"
          @update:options="consultarDetalhesFechamentos"
          :loading="loading"
          loading-text="Carregando os detalhes do fechamento."
          no-data-text="Não há detalhes até o momento."
          :footer-props="{
            pageText: '{0}-{1} de {2}',
            itemsPerPageText: 'Linhas por página',
            itemsPerPageOptions: [10, 30, 50, 100, 500, 1000],
          }"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-row justify="end">
              <v-col cols="3">
                <v-select
                  :items="tiposEvolucao"
                  :value="filtroTpEvolucao"
                  label="Evolução"
                  item-text="value"
                  item-value="key"
                  @input="updateFiltroTiposEvolucao"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="search"
                  @input="filterSearch"
                  append-icon="mdi-magnify"
                  label="Pesquisar por Documento ou Nome"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          <template v-slot:item.createdAt="{ item }">
            <span>{{ getDateTimeFormat(item.createdAt) }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import DetalhesFechamentoDiario from '@/entities/DetalhesFechamentoDiario';
import FechamentoService from '@/services/FechamentoService';
import ErrorService from '@/services/ErrorService';

const TIPOS_EVOLUCOES = [
  { key: '', value: 'TODAS' },
  { key: 'SUSPEITO', value: 'SUSPEITO' },
  { key: 'CONFIRMADO', value: 'CONFIRMADO' },
  { key: 'CURADO', value: 'CURADO' },
  { key: 'OBITO', value: 'OBITO' },
  { key: 'DESCARTADO', value: 'DESCARTADO' },
];

export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    dataFechamento: {
      type: [Date, String],
    },
  },
  data: () => ({
    totalNotif: 0,
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['createdAt'],
      sortDesc: 'false',
    },
    headers: [
      { text: 'Data', value: 'createdAt', sortable: false },
      { text: 'Unidade de Saúde', value: 'unidadeSaude', sortable: false },
      { text: 'Nome', value: 'nome', sortable: false },
      { text: 'Cidade', value: 'nomeCidade', sortable: false },
      { text: 'Evolução', value: 'tpEvolucao', sortable: false },
    ],
    detalhesFechamento: [],
    tiposEvolucao: TIPOS_EVOLUCOES,
    filtroTpEvolucao: '',
    filterCons: null,
    filter: '',
  }),
  watch: {
    value(showing) {
      if (showing) {
        this.filtroTpEvolucao = '';
        this.filterCons = null;
        this.filter = '';
        this.$refs.search.reset();
        this.consultarDetalhesFechamentos();
      }
    },
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    close() {
      this.input(false);
    },
    getDateTimeFormat(value) {
      return moment(value).format('DD/MM/YYYY HH:mm');
    },
    consultarDetalhesFechamentos({
      page, itemsPerPage,
    } = this.options) {
      this.loading = true;
      const tpEvolucao = this.filtroTpEvolucao;
      const search = this.filter || '';
      FechamentoService.getDetailsProximoFechamento({
        dataFechamento: this.dataFechamento,
        page,
        itemsPerPage,
        tpEvolucao,
        search,
      })
        .then(({ count, data }) => {
          this.totalNotif = count;
          this.detalhesFechamento = data.map((d) => new DetalhesFechamentoDiario(d));
        })
        .catch((error) => {
          this.$emit('erro:consultarFechamentos', ErrorService.getMessage(error));
        })
        .finally(() => { this.loading = false; });
    },
    updateFiltroTiposEvolucao(tpEvolucao) {
      this.filtroTpEvolucao = tpEvolucao;
      this.options = { ...this.options, page: 1 };
      this.consultarDetalhesFechamentos();
    },
    filterNotificacoes() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarDetalhesFechamentos({
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
