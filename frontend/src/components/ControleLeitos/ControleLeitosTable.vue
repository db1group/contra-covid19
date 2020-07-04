 <template>
  <v-container fluid>
    <confirm-dialog
      v-model="removingControleLeitoDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> esse controle de leito?
        </div>
      </div>
    </confirm-dialog>
    <v-data-table
      :headers="headers"
      :items="leitos"
      item-key="id"
      :server-items-length="totalLeitos"
      :options.sync="options"
      @update:options="consultaControleLeitos"
      :loading="loading"
      loading-text="Carregando os leitos de saúde."
      no-data-text="Não há eleitos de saúde até o momento."
      no-results-text="Não há eleitos de saúde com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [10, 30, 50, 100],
      }"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-row justify="end" align="center" dense>
          <v-col>
            <v-btn
              v-if="isPermiteAlterar(item)"
              text
              small
              color="##B8860B"
              :to="{ name: 'controle-leito-perfil', params: { id: item.id, edit: true } }"
            >PERFIL</v-btn>
          </v-col>
          <v-col>
            <v-btn
              text
              small
              color="#F54D09"
              :to="{ name: 'controle-leito-edit', params: { id: item.id, edit: true } }"
            >EDITAR</v-btn>
          </v-col>
          <v-col>
            <v-btn
              text
              small
              color="red"
              @click="showExclusionConfirmDialog(item)"
            >EXCLUIR</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import ControleLeitoService from '@/services/ControleLeitoService';

export default {
  components: { ConfirmDialog },
  data: () => ({
    items: [],
    loading: true,
    snack: false,
    snackColor: '',
    snackText: '',
    totalLeitos: 0,
    pagination: {},
    headers: [
      {
        text: 'Data da Notificação',
        align: 'start',
        sortable: false,
        value: 'dtNotificacao',
      },
      { text: 'Unidade Saúde', value: 'controleLeitoId' },
      { text: 'Data cadastro', value: 'createdAt' },
      { sortable: false, value: 'actions', width: '240px' },
    ],
    leitos: [],
    filter: '',
    filterCons: null,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['dtNotificacao', 'createdAt'],
      sortDesc: 'false',
    },
    user: {},
    removingControleLeitoDialog: {
      showDialog: false,
      id: null,
    },
  }),
  methods: {
    consultaControleLeitos() {
      this.loading = true;
      ControleLeitoService.findAllControleLeitosByUnidadeSaude(this.user.unidadeSaudeId)
        .then(({ count, data }) => {
          this.totalLeitos = count;
          this.leitos = data;
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaControleLeitos', data.error);
        });
    },
    confirmExclusion() {
      this.excluirItem(this.removingControleLeitoDialog.id);
    },
    excluirItem(id) {
      ControleLeitoService.delete(this.user.unidadeSaudeId, id)
        .then(() => {
          const page = this.leitos.length === 1 ? 1 : this.options.page;
          this.options = { ...this.options, page };
          this.$emit('delete:unidadeSaude', 'Unidade de saúde excluída com sucesso.');
        })
        .then(() => {
          this.consultaControleLeitos();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteUnidadeSaude', data.error);
        });
    },
    save() {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Data saved';
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    close() {
      console.log('Dialog closed');
    },
    isPermiteAlterar() {
      return true;
    },
    showExclusionConfirmDialog({ id }) {
      this.removingControleLeitoDialog.showDialog = true;
      this.removingControleLeitoDialog.id = id;
    },
  },
  created() {
    this.user = this.$store.state.user;
    this.consultaControleLeitos();
  },
};
</script>
