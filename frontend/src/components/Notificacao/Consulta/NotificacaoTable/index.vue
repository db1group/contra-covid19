<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :single-select="false"
      :headers="headers"
      :items="notificacoes"
      item-key="nome"
      :search="search"
      show-select
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
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar por Documento ou Nome"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-title>
          Ações em lote:
          <v-btn text small color="primary" @click="alterarLote()">EDITAR</v-btn>
          <v-btn text small color="primary" @click="excluirLote()">EXCLUIR</v-btn>
        </v-card-title>
      </template>
      <template v-slot:item.situacao="{ item }">
        <v-chip class="d-block text-center" :color="getColor(item.situacao)" dark>{{ item.situacao }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text small color="primary" @click="editItem(item)">EDITAR</v-btn>
        <v-btn text small color="red" @click="deleteItem(item)">EXCLUIR</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import NotificacaoService from '@/services/NotificacaoService';
import NotificacaoConsulta from '@/entities/NotificacaoConsulta';

export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      search: '',
      headers: [
        { text: 'Paciente', value: 'nome' },
        { text: 'Documento', value: 'documento' },
        { text: 'Notificação', value: 'dataNotificacao' },
        { text: 'Telefone', value: 'telefone' },
        { text: 'Situação', value: 'situacao', width: '185px' },
        { sortable: false, value: 'actions', width: '185px' },
      ],
      loading: false,
      notificacoes: [],
    };
  },
  methods: {
    getColor(situacao) {
      let color;
      switch (situacao) {
        case 'UTI': color = '#FD3A5C';
          break;
        case 'Óbito': color = 'black';
          break;
        case 'Hospitalização': color = '#FFB300';
          break;
        case 'Isolamento domiciliar': color = '#64FFDA';
          break;
        default: color = 'red';
      }
      return color;
    },
    editItem(item) {
      alert(item.name);
    },
    deleteItem(item) {
      alert(item.name);
    },
    alterarLote() {
      alert(this.selected.length);
    },
    excluirLote() {
      alert(this.selected);
    },
    consultarNotificacoes() {
      this.loading = true;
      /*
      setTimeout(() => {
        this.notificacoes = [
          {
            nome: 'Livia Dias',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'UTI',
          },
          {
            nome: 'Kianna Levin',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'UTI',
          },
          {
            nome: 'Kierra Dias',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'Óbito',
          },
          {
            nome: 'Livia Press',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'Hospitalização',
          },
          {
            nome: 'James Baptista',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'UTI',
          },
          {
            nome: 'Corey Ekstrom Bothman',
            documento: '046.800.119-04',
            dataNotificacao: '16/04/2020 - 18:30',
            telefone: '(44) 99105-1563',
            situacao: 'Isolamento domiciliar',
          },
          {
            nome: 'Jaylon Press',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'UTI',
          },
          {
            nome: 'Rayna Press',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'UTI',
          },
          {
            nome: 'Ryan Lubian',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'Isolamento domiciliar',
          },
          {
            nome: 'Kierra Baptista',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'Óbito',
          },
          {
            nome: 'Ryan Press',
            documento: '123.456.789-00',
            dataNotificacao: '01/02/2020 - 08:00',
            telefone: '(44) 91234-4321',
            situacao: 'Isolamento domiciliar',
          },
        ];
        this.loading = false;
      }, 2000);
      */
      NotificacaoService.findAll().then(({ data }) => {
        this.notificacoes = data.map((d) => new NotificacaoConsulta(d).toRequestBody());
        this.loading = false;
      });
    },
  },
  created() {
    this.consultarNotificacoes();
  },
};
</script>
