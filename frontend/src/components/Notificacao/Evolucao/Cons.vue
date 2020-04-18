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
    dataHoraAtualizacao: '01/04/2020 10:00',
    local: 'Alta com isolamento domiciliar',
    situacao: 'Suspeito',
  },
  {
    id: '2',
    dataHoraAtualizacao: '05/04/2020 10:00',
    local: 'Hospitalizado – Leito comum',
    situacao: 'Confirmado',
  },
  {
    id: '3',
    dataHoraAtualizacao: '01/04/2020 10:00',
    local: 'Hospitalizado – Leito comum',
    situacao: 'Curado',
  },
  {
    id: '4',
    dataHoraAtualizacao: '01/04/2020 10:00',
    local: 'Alta com isolamento domiciliar',
    situacao: 'Encerrado',
  },
  {
    id: '5',
    dataHoraAtualizacao: '01/04/2020 10:00',
    local: 'Alta com isolamento domiciliar',
    situacao: 'Descartado',
  },
  {
    id: '6',
    dataHoraAtualizacao: '01/04/2020 10:00',
    local: 'Hospitalizado - Leito UTI',
    situacao: 'Óbito',
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
      console.log(EVOLUCOES);
      this.loading = true;
      const { id } = this.route.params;
      console.log(id);
      NotificacaoService.findEvolucao({ id, page, itemsPerPage }).then(({ count, data }) => {
        this.totalEvolucoes = count;
        this.evolucoes = data.map((e) => new NotificacaoEvolucao(e).toRequestBody());
        this.loading = false;
      });
      /*
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
      */
    },
  },
};
</script>
