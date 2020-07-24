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
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Alterar Data de Criação</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" class="ma-2">
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="evolucaoChanged.createdAt"
                    v-mask="'##/##/#### ##:##'"
                    :rules="rules.createdAt"
                    label="Data de criação"
                    single-line
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" text :loading="updating" @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            <template v-slot:item.createdAt="{ item } ">
              <v-btn
                v-if="isAlteraEvolucao"
                text
                @click="edit(item)"
                title="Alterar data de criação"
              >{{ item.createdAt }}</v-btn>
              <span v-else>{{ item.createdAt }}</span>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-row justify="end" align="center" dense>
                <v-col v-if="canDelete(item)">
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
import { mask } from 'vue-the-mask';
import { dateHourMinuteFormat } from '@/validations/CommonValidations';
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import EvolucaoService from '@/services/EvolucaoService';
import ErrorService from '@/services/ErrorService';
import DateService from '@/services/DateService';
import keycloak from '@/services/KeycloakService';

export default {
  directives: { mask },
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
      { text: 'Data de criação', value: 'createdAt' },
      { text: 'Data da atualização', value: 'dataHoraAtualizacao' },
      { text: 'Data de fechamento', value: 'dtfechamento' },
      { text: 'Situação', value: 'situacao' },
      { sortable: false, value: 'actions', width: '140px' },
    ],
    removingNotificationDialog: {
      showDialog: false,
      id: null,
    },
    rules: {
      createdAt: [dateHourMinuteFormat],
    },
    notificacaoId: '',
    dialog: false,
    evolucaoChanged: {
      id: null,
      createdAt: null,
    },
    updating: false,
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
          this.$emit('erro:deleteEvolucao', ErrorService.getMessage(error));
        });
    },
    canDelete(item) {
      const evolutionSize = this.evolucoes.length;
      const notFirstItem = evolutionSize > 1 && item.id === this.evolucoes[evolutionSize - 1].id;
      const notClosed = item.dtfechamento === null;
      return notClosed && notFirstItem;
    },
    edit({ id, createdAt }) {
      this.evolucaoChanged.id = id;
      this.evolucaoChanged.createdAt = createdAt;
      this.dialog = true;
    },
    close() {
      this.evolucaoChanged.id = null;
      this.evolucaoChanged.createdAt = null;
      this.dialog = false;
    },
    save() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.updating = true;
      this.evolucaoChanged.createdAt = DateService
        .toMomentObject(this.evolucaoChanged.createdAt, 'DD/MM/YYYY HH:mm')
        .toISOString();
      EvolucaoService.updateCreatedAt(this.notificacaoId, this.evolucaoChanged)
        .then(() => {
          this.$emit('update:createdAt', 'Data de cadastro atualizada com sucesso.');
        })
        .catch((error) => {
          this.$emit('erro:createdAt', ErrorService.getMessage(error));
        })
        .finally(() => {
          this.evolucaoChanged.id = null;
          this.evolucaoChanged.createdAt = null;
          this.dialog = false;
          this.updating = false;
        });
    },
  },
  computed: {
    evolucoes() {
      return this.evolucao.items;
    },
    isAlteraEvolucao() {
      return keycloak.realmAccess.roles.includes('ALTERA_EVOLUCAO');
    },
  },
  created() {
    this.notificacaoId = this.$route.params.id;
  },
};
</script>
