 <template>
  <v-container fluid>
    <confirm-dialog
      v-model="removingControleLeitoPerfilDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> esse controle de leito perfil?
        </div>
      </div>
    </confirm-dialog>
    <v-data-table
      :headers="headers"
      :items="leitos"
      item-key="id"
      :server-items-length="totalLeitos"
      :options.sync="options"
      @update:options="consultaControleLeitosPerfis"
      :loading="loading"
      loading-text="Carregando os leitos perfis de saúde."
      no-data-text="Não há leitos perfis até o momento."
      no-results-text="Não há leitos perfis com estes dados."
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
import ControleLeitoPerfilService from '@/services/ControleLeitoPerfilService';

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
    removingControleLeitoPerfilDialog: {
      showDialog: false,
      id: null,
    },
  }),
  props: {
    id: String,
  },

  watch: {
    id(controleLeitoId) {
      this.carregarControleLeitoPerfil(controleLeitoId);
      return controleLeitoId;
    },
  },
  methods: {
    consultaControleLeitosPerfis(id) {
      this.loading = true;
      ControleLeitoPerfilService.findAllControleLeitosByUnidadeSaude(id)
        .then(({ count, data }) => {
          this.totalLeitos = count;
          this.leitos = data;
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaControleLeitosPerfis', data.error);
        });
    },
    confirmExclusion() {
      this.excluirItem(this.removingControleLeitoPerfilDialog.id);
    },
    excluirItem(id) {
      ControleLeitoPerfilService.delete(this.user.unidadeSaudeId, id)
        .then(() => {
          const page = this.leitos.length === 1 ? 1 : this.options.page;
          this.options = { ...this.options, page };
          this.$emit('delete:controleLeitoPerfil', 'Controle de leito Perfil excluído com sucesso.');
        })
        .then(() => {
          this.consultaControleLeitosPerfis();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteControleLeitoPerfil', data.error);
        });
    },
    showExclusionConfirmDialog({ id }) {
      this.removingControleLeitoPerfilDialog.showDialog = true;
      this.removingControleLeitoPerfilDialog.id = id;
    },
    carregarControleLeitoPerfil(id) {
      this.consultaControleLeitosPerfis(id);
    },
  },
  created() {
    this.user = this.$store.state.user;
  },
};
</script>
