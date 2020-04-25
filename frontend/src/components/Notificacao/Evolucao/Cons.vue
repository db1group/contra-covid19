<template>
  <div>
    <v-row>
      <v-col>
        <h4 class="primary--text font-weight-medium title">IDENTIFICAÇÃO DO NOTIFICANTE</h4>
        <v-row dense>
          <v-col>
            <span class="font-weight-bold">Nome</span>
            <p>{{evolucao.nome}}</p>
          </v-col>
          <v-col>
            <span class="font-weight-bold">Documento</span>
            <p>{{evolucao.documento}}</p>
          </v-col>
          <v-col>
            <span class="font-weight-bold">Telefone</span>
            <p>{{evolucao.telefone}}</p>
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
          loading-text="Carregando as evoluções do paciente."
          no-data-text="Não há evoluções até o momento."
          :footer-props="{
            pageText: '{0}-{1} de {2}',
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

export default {
  props: {
    evolucao: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selected: [],
    headers: [
      { text: 'Data da atualização', value: 'dataHoraAtualizacao' },
      { text: 'Local', value: 'local' },
      { text: 'Situação', value: 'situacao' },
    ],
  }),
  computed: {
    evolucoes() {
      return this.evolucao.items;
    },
  },
};
</script>
