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
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
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
          this.leitosPerfis = data.map((d) => new ControleLeitoPerfil(d).toTable(this.user.unidadeSaudeNome));
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaControleLeitosPerfis', data.error);
        });
    },
    atualizarControleLeitoPerfil(leitoPerfil) {
      console.log('leito', leitoPerfil);
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
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Alteração salva';
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
    async atualizaLeitosPerfis() {
      this.loading = true;
      const promises = this.leitosPerfis.map(async (leitoPerfil) => this.atualizarControleLeitoPerfil(leitoPerfil));
      await Promise.all(promises);
      console.log('Finished!');
    },
  },
  created() {
    this.user = this.$store.state.user;
  },
};
</script>
