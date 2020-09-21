 <template>
  <v-container fluid>
    <header-title :title="title" backRoute="usuario-cons" />

    <v-card class="mx-auto" width="500" :loading="loading">
      <v-card-title>
        <h3 class="primary--text">Usuário</h3>
      </v-card-title>
      <v-form ref="form" class="ma-2 form-unid">
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              class="capitalize"
              :value="usuario.nome"
              label="Usuário"
              :rules="rules.nome"
              @input="updateNome"
              validate-on-blur
              required
              autofocus
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              :value="usuario.email"
              label="E-mail"
              :rules="rules.email"
              @input="updateEmail"
              :disabled="!!usuario.id"
              validate-on-blur
              required
              autofocus
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col>
            <v-autocomplete
              :value="usuario.unidadeSaudeId"
              :rules="rules.unidadeSaudeId"
              label="Unidade de Saúde *"
              :items="unidades.items"
              item-text="nome"
              item-value="id"
              :loading="unidades.loading"
              @update:search-input="searchUnidades"
              @input="updateUnidadeId"
              no-data-text="Unidade de Saúde não encontrada"
              required
              validate-on-blur
            />
          </v-col>
        </v-row>
        <h4>Permissões</h4>
        <v-progress-linear :active="permissions.loading" indeterminate></v-progress-linear>
        <div class="d-flex flex-wrap">
          <div v-for="p in permissions.items" :key="p.name" :loading="permissions.loading">
            <v-switch v-model="usuario.permissoes" :label="p.description" :value="p.name"></v-switch>
          </div>
        </div>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="salvarUnidade" :loading="loading">Salvar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="usuario-form__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </v-container>
</template>
<style lang="sass" scoped>
.usuario-form
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
  &.v-input--selection-controls
    margin-top: 0
    padding-top: 0
  &.v-input__slot
    margin-botton: 0
</style>
<style scoped>
  .capitalize >>> input {
    text-transform: uppercase;
  }
</style>
<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import {
  required, maxLength, minLength,
} from '@/validations/CommonValidations';
import Usuario from '@/entities/Usuario';
import UserService from '@/services/UserService';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';
import keycloak from '@/services/KeycloakService';
import ErrorService from '@/services/ErrorService';

const StateForm = {
  NEW: 'NEW',
  EDIT: 'EDIT',
};

export default {
  components: {
    HeaderTitle,
  },
  props: {
    id: String,
  },
  watch: {
    id(usuarioId) {
      this.editarUnidade(usuarioId);
      return usuarioId;
    },
  },
  data: () => ({
    stateForm: StateForm.NEW,
    searchUnidade: null,
    usuario: new Usuario(),
    loading: false,
    showError: false,
    mensagemErro: null,
    showSuccess: false,
    mensagemSucesso: null,
    unidades: {
      loading: false,
      items: [],
    },
    permissions: {
      loading: false,
      items: [],
    },
    rules: {
      nome: [required, maxLength(150), minLength(3)],
      email: [required, maxLength(150), minLength(3)],
      unidadeSaudeId: [required],
    },
    isSecretariaSaude: false,
  }),
  computed: {
    title() {
      switch (this.stateForm) {
        case StateForm.EDIT: return 'Editar Usuário';
        default: return 'Cadastrar Usuário';
      }
    },
  },
  methods: {
    salvarUnidade() {
      if (this.stateForm === StateForm.NEW) {
        this.cadastrarUsuario();
      } else {
        this.atualizarUsuario();
      }
    },
    cadastrarUsuario() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id, unidadeSaudeNome, ...user } = this.usuario;
        UserService.save(user)
          .then(() => {
            this.usuario = new Usuario();
            this.searchUnidade = null;
            this.showSuccess = true;
            this.mensagemSucesso = 'Usuário cadastrado com sucesso.';
          })
          .catch((error) => {
            this.showError = true;
            this.mensagemErro = ErrorService.getMessage(error);
          })
          .finally(() => { this.loading = false; });
      }
    },
    atualizarUsuario() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id, unidadeSaudeNome, ...user } = this.usuario;
        UserService.update(id, user)
          .then(() => {
            this.showSuccess = true;
            this.mensagemSucesso = 'Usuário atualizado com sucesso.';
          })
          .catch((error) => {
            this.showError = true;
            this.mensagemErro = ErrorService.getMessage(error);
          })
          .finally(() => { this.loading = false; });
      }
    },
    updateNome(nome) {
      this.usuario.nome = nome.toUpperCase();
    },
    updateEmail(email) {
      this.usuario.email = email;
    },
    searchUnidades(search = '') {
      if (search === this.searchUnidade) return;
      this.searchUnidade = search ? search.trim().toUpperCase() : '';
      this.findUnidadesSaude(this.searchUnidade);
    },
    findUnidadesSaude(searchUnidade = '') {
      this.unidades.loading = true;
      UnidadeSaudeService.findAll(searchUnidade)
        .then(({ data }) => {
          this.unidades.items = data;
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        })
        .finally(() => {
          this.unidades.loading = false;
        });
    },
    updateUnidadeId(unidadeSaudeId) {
      this.usuario.unidadeSaudeId = unidadeSaudeId;
    },
    buscarUsuario(id) {
      this.loading = true;
      UserService.findById(id)
        .then(({ data }) => {
          this.usuario = new Usuario({ ...data });
          this.findUnidadesSaude(this.usuario.unidadeSaudeNome);
          this.$refs.form.resetValidation();
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        })
        .finally(() => { this.loading = false; });
    },
    editarUnidade(id) {
      this.stateForm = StateForm.EDIT;
      this.buscarUsuario(id);
    },
    findAllPermissions() {
      this.permissions.loading = true;
      UserService.findAllPermissions()
        .then(({ data }) => {
          this.permissions.items = data.filter((d) => d.name !== 'ENVIO_SECRETARIA');
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        })
        .finally(() => { this.permissions.loading = false; });
    },
  },
  created() {
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    this.findUnidadesSaude();
    this.findAllPermissions();
  },
};
</script>
