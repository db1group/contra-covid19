<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="fechamentos"
      item-key="id"
      :server-items-length="totalNotif"
      :options.sync="options"
      @update:options="consultarFechamentos"
      :loading="loading"
      loading-text="Carregando o fechamento."
      no-data-text="Não há fechamento até o momento."
      no-results-text="Não há fechamento com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [10, 30, 50, 100],
      }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-title>
          <v-row>
            <v-col cols="4">
              <v-btn
                rounded
                color="primary"
                :dark="!temFechamentoEmAberto"
                :disabled="temFechamentoEmAberto"
                @click="novoFechamento"
              >Iniciar novo fechamento</v-btn>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="12">
              <v-text-field
                @input="filterSearch"
                :rules="rules.search"
                v-mask="'##/##/####'"
                append-icon="mdi-magnify"
                label="Pesquisar por Data"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
      </template>
      <template v-slot:item.dataFechamento="{ item }">
        <span>{{ getDateFormat(item.dataFechamento) }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row justify="start" align="center" dense>
          <v-col>
            <div v-if="item.status === 'FECHADO'">
              <v-btn
                v-if="podeReabrirFechamento(item)"
                small
                text
                color="#4CAF50"
                @click="reabrirFechamento(item)"
              >ABRIR</v-btn>
              <span v-else class="primary--text">FECHADO</span>
            </div>
            <div v-else>
              <v-btn small rounded dark color="primary" @click="encerrarFechamento(item)">FECHAR</v-btn>
              <v-btn
                v-if="item.status === 'ABERTO'"
                small
                text
                rounded
                color="#B8860B"
                class="ml-5"
                @click="cancelarFechamento"
              >CANCELAR</v-btn>
              <v-btn
                small
                text
                rounded
                color="#F54D09"
                class="ml-5"
                @click="toggleDetailModal(true, item.dataFechamento)"
              >DETALHES</v-btn>
            </div>
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
import { mask } from 'vue-the-mask';
import moment from 'moment';
import FechamentoDiario from '@/entities/FechamentoDiario';
import FechamentoService from '@/services/FechamentoService';
import { dateFormat, dateMustBeLesserEqualsThanToday } from '@/validations/CommonValidations';
import ErrorService from '@/services/ErrorService';

export default {
  directives: { mask },
  components: { },
  data: () => ({
    rules: {
      search: [dateFormat, dateMustBeLesserEqualsThanToday],
    },
    totalNotif: 0,
    filter: '',
    filterCons: null,
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['dataFechamento'],
      sortDesc: 'true',
    },
    headers: [
      { text: 'Data', value: 'dataFechamento', sortable: false },
      { text: 'Notificados', value: 'casosNotificados', sortable: false },
      { text: 'Acompanhados', value: 'acompanhados', sortable: false },
      { text: 'Encerrados', value: 'casosEncerrados', sortable: false },
      { text: 'Descartados', value: 'descartados', sortable: false },
      { text: 'Confirmados', value: 'confirmados', sortable: false },
      { text: 'Curados', value: 'curados', sortable: false },
      { text: 'Óbitos', value: 'obitos', sortable: false },
      {
        text: 'Situação',
        value: 'actions',
        aling: 'start',
        sortable: false,
      },
    ],
    fechamentos: [],
  }),
  methods: {
    getDateFormat(value) {
      return moment.utc(value).format('DD/MM/YYYY');
    },
    toggleDetailModal(value, dataFechamento) {
      this.$emit('toggleDetailModal', { value, dataFechamento });
    },
    filterSearch(search) {
      if (search.length === 10) {
        const [day, month, year] = search.split('/');
        const date = new Date(year, month - 1, day);
        this.filter = moment(date).format('YYYY-MM-DD');
        this.filterFechamentos();
        return;
      }
      if (search.length === 0) {
        this.filter = '';
        this.filterFechamentos();
      }
    },
    filterFechamentos() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarFechamentos({
          page: 1,
          itemsPerPage: this.options.itemsPerPage,
        });
      }, 500);
    },
    novoFechamento() {
      FechamentoService.getProximoFechamento().then((data) => {
        if (!this.fechamentos.length) {
          this.totalNotif = 1;
        }
        const value = data;
        value.status = 'ABERTO';
        this.fechamentos.splice(0, 0, new FechamentoDiario(value));
      }).catch((error) => {
        this.$emit('erro:novoFechamento', ErrorService.getMessage(error));
      });
    },
    encerrarFechamento(item) {
      FechamentoService.postProximoFechamento(item).then(() => {
        this.consultarFechamentos();
        this.$emit('success:encerrarFechamento');
      }).catch((error) => {
        this.$emit('erro:encerrarFechamento', ErrorService.getMessage(error));
      });
    },
    cancelarFechamento() {
      if (!this.fechamentos.length) {
        this.totalNotif = 1;
      }
      this.fechamentos.shift();
    },
    consultarFechamentos({
      page, itemsPerPage, sortBy = 'dataFechamento', sortDesc = 'true',
    } = this.options) {
      this.loading = true;
      const search = this.filter;
      FechamentoService.findAll({
        page, itemsPerPage, sortBy, sortDesc, search,
      })
        .then(({ count, data }) => {
          this.totalNotif = count;
          this.fechamentos = data.rows.map((d) => new FechamentoDiario(d));
        })
        .catch((error) => {
          this.$emit('erro:consultarFechamentos', ErrorService.getMessage(error));
        })
        .finally(() => { this.loading = false; });
    },
    podeReabrirFechamento(item) {
      if (this.options.page > 1) return false;
      const [primeiroFechado] = this.fechamentos.filter((i) => i.status === 'FECHADO');
      return item === primeiroFechado;
    },
    reabrirFechamento({ id }) {
      // this.fechamentos = this.fechamentos.map((f) => (f.id === item.id ? { ...item, status: 'ABERTO' } : f));
      FechamentoService.reabrirFechamento(id).then(() => {
        this.consultarFechamentos();
        this.$emit('success:reabrirFechamento');
      }).catch((error) => {
        this.$emit('erro:reabrirFechamento', ErrorService.getMessage(error));
      });
    },
  },
  computed: {
    temFechamentoEmAberto() {
      return this.fechamentos.some((el) => el.status === 'ABERTO');
    },
  },
};
</script>
