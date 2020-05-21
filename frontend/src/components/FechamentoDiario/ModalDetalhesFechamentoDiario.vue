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
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="close"
          >
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
            itemsPerPageOptions: [10, 30, 50, 100],
          }"
          class="elevation-1"
        >
          <template v-slot:item.dataFechamento="{ item }">
            <span>{{ getDateFormat(item.dataFechamento) }}</span>
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

export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    totalNotif: 0,
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['dataFechamento'],
      sortDesc: 'true',
    },
    headers: [
      { text: 'Data', value: 'dataFechamento' },
      { text: 'Unidade de Saúde', value: 'dataFechamento' },
      { text: 'Nome', value: 'dataFechamento' },
      { text: 'Evolução', value: 'dataFechamento' },
    ],
    detalhesFechamento: [],
  }),
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    close() {
      this.input(false);
    },
    getDateFormat(value) {
      return moment(value).format('DD/MM/YYYY');
    },
    consultarDetalhesFechamentos({
      page, itemsPerPage, sortBy = 'dataFechamento', sortDesc = 'true',
    } = this.options) {
      this.loading = true;
      const search = this.filter;
      FechamentoService.findAll({
        page, itemsPerPage, sortBy, sortDesc, search,
      })
        .then(({ count, data }) => {
          this.totalNotif = count;
          this.fechamentos = data.rows.map((d) => new DetalhesFechamentoDiario(d));
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultarFechamentos', data.error);
        })
        .finally(() => { this.loading = false; });
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
