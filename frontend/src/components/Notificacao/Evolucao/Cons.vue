<template>
  <v-container fluid>
    <confirm-dialog
      v-model="removingNotificationDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> a evolução?
        </div>
      </div>
    </confirm-dialog>
    <div>
      <v-row>
        <v-col>
          <h4 class="primary--text font-weight-medium title">IDENTIFICAÇÃO DO PACIENTE</h4>
          <v-row dense>
            <v-col>
              <span class="font-weight-bold">Nome</span>
              <p>{{evolucao.nome}}</p>
            </v-col>
            <v-col>
              <span class="font-weight-bold">Documento</span>
              <p>{{ evolucao.documento | FormatDocument(evolucao.tipoDocumento) }}</p>
            </v-col>
            <v-col>
              <span class="font-weight-bold">Telefone</span>
              <p>{{evolucao.telefone | FormatPhone }}</p>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="auto">
              <v-btn
                text
                small
                color="primary"
                :to="{ name: 'notificacao-view', params: { id: evolucao.id } }"
              >Ver ficha completa</v-btn>
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
            <template v-slot:item.actions="{ item }">
              <v-row justify="end" align="center" dense>
                <v-col>
                  <v-btn text small color="red" @click="showExclusionConfirmDialog(item)">EXCLUIR</v-btn>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>

import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import EvolucaoService from '@/services/EvolucaoService';

export default {
  components: { ConfirmDialog },
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
      { sortable: false, value: 'actions', width: '140px' },
    ],
    removingNotificationDialog: {
      showDialog: false,
      id: null,
    },
    notificacaoId: '',
  }),
  methods: {
    showExclusionConfirmDialog({ id }) {
      this.removingNotificationDialog.showDialog = true;
      this.removingNotificationDialog.id = id;
    },
    confirmExclusion() {
      this.excluirItem(this.removingNotificationDialog.id);
    },
    excluirItem(notificacaoEvolucaoId) {
      EvolucaoService.delete(this.notificacaoId, notificacaoEvolucaoId)
        .then(() => {
          this.$emit('delete:evolucao', 'Evolução excluída com sucesso.');
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteEvolucao', data.error);
        });
    },
  },
  computed: {
    evolucoes() {
      return this.evolucao.items;
    },
  },
  created() {
    this.notificacaoId = this.$route.params.id;
  },
};
</script>
