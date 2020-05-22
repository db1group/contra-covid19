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
              >
                Iniciar novo fechamento
              </v-btn>
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
        <v-row justify="end" align="center" dense>
          <v-col>
            <span v-if="item.status === 'FECHADO'" class="primary--text">FECHADO</span>
            <div v-else>
              <v-btn
                small
                rounded
                dark
                color="primary"
                @click="encerrarFechamento"
              >FECHAR</v-btn>
              <v-btn
                small
                text
                rounded
                color="#B8860B"
                class="ml-5"
                @click="toggleDetailModal(true)"
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
      { text: 'Data', value: 'dataFechamento' },
      { text: 'Notificados', value: 'casosNotificados' },
      { text: 'Acompanhados', value: 'acompanhados' },
      { text: 'Encerrados', value: 'casosEncerrados' },
      { text: 'Confirmados', value: 'confirmados' },
      { text: 'Isolamento Domiciliar', value: 'emIsolamentoDomiciliar' },
      { text: 'Internados', value: 'internados' },
      { text: 'Curados', value: 'curados' },
      { text: 'Óbitos', value: 'obitos' },
      { text: 'Situação', value: 'actions', aling: 'center' },
    ],
    fechamentos: [],
  }),
  methods: {
    getDateFormat(value) {
      return moment(value).format('DD/MM/YYYY');
    },
    toggleDetailModal(value) {
      this.$emit('toggleDetailModal', value);
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
      }).catch((err) => {
        const { data } = err.response || {};
        this.$emit('erro:novoFechamento', data.error);
      });
    },
    encerrarFechamento() {
      FechamentoService.postProximoFechamento().then(() => {
        this.consultarFechamentos();
        this.$emit('success:encerrarFechamento');
      }).catch((err) => {
        const { data } = err.response || {};
        this.$emit('erro:encerrarFechamento', data.err);
      });
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
          const { data } = error.response || {};
          this.$emit('erro:consultarFechamentos', data.error);
        })
        .finally(() => { this.loading = false; });
    },
  },
  computed: {
    temFechamentoEmAberto() {
      return this.fechamentos.some((el) => el.status === 'ABERTO');
    },
  },
};
</script>
