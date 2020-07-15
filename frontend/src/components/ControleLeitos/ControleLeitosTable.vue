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
      loading-text="Carregando os controle de leitos."
      no-data-text="Não há controle de leito até o momento."
      no-results-text="Não há controle de leito com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [10, 30, 50, 100],
      }"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-row justify="end" align="center" dense>
          <v-col cols="12">
            <v-btn
              text
              small
              color="##B8860B"
              :to="{ name: 'controle-leito-perfil-cons', params: { id: item.id, controleLeito: item, edit: true } }"
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
import ControleLeitoLista from '@/entities/ControleLeitoLista';

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
      { text: 'Unidade Saúde', value: 'unidadeSaudeNome' },
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
      ControleLeitoService
        .findAllControleLeitosByUnidadeSaude(
          this.user.unidadeSaudeId,
          this.options.page,
          this.options.itemsPerPage,
        )
        .then(({ count, data }) => {
          this.totalLeitos = count;
          this.leitos = data.map((d) => new ControleLeitoLista(d).toTable(this.user.unidadeSaudeNome));
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
          this.$emit('delete:controleLeitos', 'Controle de leito excluído com sucesso.');
        })
        .then(() => {
          this.consultaControleLeitos();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteControleLeitos', data.error);
        });
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
