<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="fechamentos"
      item-key="id"
      :server-items-length="totalFechamentos"
      :options.sync="options"
      @update:options="consultarFechamentos"
      :loading="loading"
      loading-text="Carregando o fechamento manual."
      no-data-text="Não há fechamento manual até o momento."
      no-results-text="Não há fechamento manual com estes dados."
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
            <v-col>
              <v-btn
                rounded
                color="primary"
                :to="{ name: 'fechamento-manual-new' }"
              ><v-icon>mdi-plus</v-icon> Realizar fechamento</v-btn>
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
            <v-btn
                small
                text
                rounded
                color="#F54D09"
                class="ml-5"
                @click="excluirFechamento(item)"
              >EXCLUIR</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mask } from 'vue-the-mask';
import moment from 'moment';
import FechamentoService from '@/services/FechamentoService';
import ErrorService from '@/services/ErrorService';
import FechamentoDiario from '@/entities/FechamentoDiario';

export default {
  directives: { mask },
  components: {},
  data: () => ({
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
    loading: true,
    totalFechamentos: 0,
    fechamentos: [],
  }),
  methods: {
    getDateFormat(value) {
      return moment.utc(value).format('DD/MM/YYYY');
    },
    consultarFechamentos({ page, itemsPerPage } = this.options) {
      this.loading = true;
      FechamentoService.findAll({
        page, itemsPerPage,
      })
        .then(({ count, data }) => {
          this.totalFechamentos = count;
          this.fechamentos = data.map((d) => new FechamentoDiario(d));
        })
        .catch((error) => {
          this.$emit('erro:consultarFechamentos', ErrorService.getMessage(error));
        })
        .finally(() => {
          this.loading = false;
        });
    },
    excluirFechamento({ id }) {
      FechamentoService.reabrirFechamento(id)
        .then(() => {
          this.$emit('success:reabrirFechamento');
          setTimeout(() => {
            this.consultarFechamentos();
          }, 500);
        })
        .catch((error) => {
          this.$emit('erro:reabrirFechamento', ErrorService.getMessage(error));
        })
        .finally(() => { this.reabrindo = false; });
    },
  },
};
</script>
