<template>
  <div>
    <v-row>
      <v-col>
        <h4 class="primary--text font-weight-medium title">IDENTIFICAÇÃO DO NOTIFICANTE</h4>
        <v-row dense>
          <v-col>
            <strong>Nome</strong>
            <p>{{notificacao.nome}}</p>
          </v-col>
          <v-col>
            <strong>Documento</strong>
            <p>{{notificacao.documento}}</p>
          </v-col>
          <v-col>
            <strong>Telefone</strong>
            <p>{{notificacao.telefone}}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="evolucoes"
          item-key="id"
          :options.sync="options"
          :server-items-length="totalEvolucoes"
          :loading="loading"
          loading-text="Carregando as evoluções do paciente."
          no-data-text="Não há evoluções até o momento."
          :footer-props="{
            itemsPerPageText: 'Linhas por página'
          }"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-card-title>Listagem das Evoluções do Paciente</v-card-title>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import NotificacaoService from '@/services/NotificacaoService';
import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

const EVOLUCOES = [
  {
    id: '1',
    dtEvolucao: '2020-04-18T15:53:01.553Z',
    tpLocal: 'Alta com isolamento domiciliar',
    tpEvolucao: 'Suspeito',
  },
  {
    id: '2',
    dtEvolucao: '2020-04-18T15:53:01.553Z',
    tpLocal: 'Hospitalizado – Leito comum',
    tpEvolucao: 'Confirmado',
  },
  {
    id: '3',
    dtEvolucao: '2020-04-18T15:53:01.553Z',
    tpLocal: 'Hospitalizado – Leito comum',
    tpEvolucao: 'Curado',
  },
  {
    id: '4',
    dtEvolucao: '2020-04-18T15:53:01.553Z',
    tpLocal: 'Alta com isolamento domiciliar',
    tpEvolucao: 'Encerrado',
  },
  {
    id: '5',
    dtEvolucao: '2020-04-18T15:53:01.553Z',
    tpLocal: 'Alta com isolamento domiciliar',
    tpEvolucao: 'Descartado',
  },
  {
    id: '6',
    dtEvolucao: '2020-04-18T15:53:01.553Z',
    tpLocal: 'Hospitalizado - Leito UTI',
    tpEvolucao: 'Óbito',
  },
];

export default {
  data: () => ({
    selected: [],
    loading: true,
    options: {},
    totalEvolucoes: 0,
    evolucoes: [],
    notificacao: {},
    headers: [
      { text: 'Data da atualização', value: 'dataHoraAtualizacao' },
      { text: 'Local', value: 'local' },
      { text: 'Situação', value: 'situacao' },
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
    consultarNotificacoes({ page, itemsPerPage } = this.options) {
      this.loading = true;
      const { id } = this.$route.params;
      NotificacaoService.findEvolucao({ id, page, itemsPerPage }).then(({ count, data }) => {
        console.log(count, data);
        /*
        this.totalEvolucoes = count;
        this.evolucoes = data.map((e) => new NotificacaoEvolucao(e).toRequestBody());
        this.loading = false;
        */
      });
      setTimeout(() => {
        this.notificacao = {
          nome: 'Corey Ekstrom Bothman',
          documento: '123.456.789-00',
          telefone: '(44) 12345-6789',
        };
        this.evolucoes = EVOLUCOES.map((e) => new NotificacaoEvolucao(e).toRequestBody());
        this.totalEvolucoes = this.evolucoes.length;
        this.loading = false;
      }, 2000);
    },
  },
};
</script>
