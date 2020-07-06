 <template>
  <v-container fluid>
    <header-title :title="'Controle Leito Perfil'" backRoute="controle-leitos-cons" />
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
    <v-data-table :headers="headers" :items="leitosPerfis">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >Novo Perfil</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Novo Perfil</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="perfil.causa" label="Causa"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="perfil.perfilNome" label="Perfil"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelNovoPerfil">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="saveNovoPerfil">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.causa="props">
        <v-edit-dialog
          :return-value.sync="props.item.causa"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.causa }}
          <template v-slot:input>
            <v-text-field v-model="props.item.causa" label="Edit" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.perfilNome="props">
        <v-edit-dialog
          :return-value.sync="props.item.perfilNome"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.perfilNome }}
          <template v-slot:input>
            <v-text-field v-model="props.item.perfilNome" label="Edit" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import ControleLeitoPerfilService from '@/services/ControleLeitoPerfilService';
import ControleLeitoService from '@/services/ControleLeitoService';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import ControleLeitoPerfilLista from '@/entities/ControleLeitoPerfilLista';
import ControleLeitoPerfil from '@/entities/ControleLeitoPerfil';

export default {
  components: { ConfirmDialog, HeaderTitle },
  data: () => ({
    items: [],
    loading: true,
    snack: false,
    snackColor: '',
    snackText: '',
    totalLeitos: 0,
    pagination: {},
    dialog: false,
    headers: [
      {
        text: 'Causa', align: 'start', sortable: true, value: 'causa',
      },
      {
        text: 'Perfil', align: 'start', sortable: true, value: 'perfilNome',
      },
      {
        text: 'Unidade Saúde', value: 'unidadeSaudeNome',
      },
      {
        text: 'Data cadastro', value: 'createdAt', sortable: true,
      },
      {
        sortable: false, value: 'actions', width: '240px',
      },
    ],
    perfil: {
      causa: '',
      perfilNome: '',
    },
    defaultPerfil: {
      causa: '',
      perfilNome: '',
    },
    leitosPerfis: [],
    filter: '',
    filterCons: null,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['causa', 'createdAt'],
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
    controleLeito: Object,
  },
  computed: {
    formTitle() {
      return 'New Item';
    },
  },
  watch: {
    id(controleLeitoId) {
      this.carregarControleLeitoPerfil(controleLeitoId);
      return controleLeitoId;
    },
  },
  methods: {
    salvaControleLeitoPerfil() {
      ControleLeitoService.findByControleLeitoId(
        this.user.unidadeSaudeId,
        this.controleLeito.id,
      ).then((response) => {
        const controleLeitoPerfil = new ControleLeitoPerfil(this.perfil, response.data.ControleLeito);
        controleLeitoPerfil.ControleLeito.id = null;
        console.log('controleLeitoPerfil', controleLeitoPerfil);
        ControleLeitoPerfilService.save(controleLeitoPerfil, this.user.unidadeSaudeId)
          .then(() => {
            const page = this.leitosPerfis.length === 1 ? 1 : this.options.page;
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
      });
    },
    consultaControleLeitosPerfis(id) {
      this.loading = true;
      ControleLeitoPerfilService.findAllControleLeitosByUnidadeSaude(id)
        .then(({ count, data }) => {
          this.totalLeitos = count;
          this.leitosPerfis = data.map((d) => new ControleLeitoPerfilLista(d).toTable(this.user.unidadeSaudeNome));
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaControleLeitosPerfis', data.error);
        });
    },
    atualizarControleLeitoPerfil(leitoPerfil) {
      return ControleLeitoPerfilService.update({
        perfilId: leitoPerfil.id,
        causa: leitoPerfil.causa,
      }, leitoPerfil.controleLeitoId)
        .then(() => {
          this.showSuccess = true;
          this.mensagemSucesso = 'Controle de Leitos atualizada com sucesso.';
        })
        .catch(({ response }) => {
          this.showError = true;
          this.mensagemErro = response.data.error;
        })
        .finally(() => { this.loading = false; });
    },
    confirmExclusion() {
      this.excluirItem(this.removingControleLeitoPerfilDialog.id);
    },
    excluirItem(id) {
      ControleLeitoPerfilService.delete(this.user.unidadeSaudeId, id)
        .then(() => {
          const page = this.leitosPerfis.length === 1 ? 1 : this.options.page;
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
    save() {
      this.atualizaLeitosPerfis();
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Cancelado';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Edição disponível';
    },
    close() {
      this.atualizaLeitosPerfis();
    },
    saveNovoPerfil() {
      this.salvaControleLeitoPerfil();
    },
    cancelNovoPerfil() {
      this.dialog = false;
      this.$nextTick(() => {
        this.perfil = Object.assign({}, ...this.defaultItem);
      });
    },
    async atualizaLeitosPerfis() {
      this.loading = true;
      const promises = this.leitosPerfis.map(async (leitoPerfil) => this.atualizarControleLeitoPerfil(leitoPerfil));
      await Promise.all(promises);
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Alteração salva';
    },
  },
  created() {
    this.user = this.$store.state.user;
  },
};
</script>
