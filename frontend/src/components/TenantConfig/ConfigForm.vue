 <template>
  <v-container fluid>
    <header-title :title="title" backRoute="tenant-config-cons" />

    <v-card class="mx-auto" max-width="500" :loading="loading">
      <v-card-title>
        <h3 class="primary--text">Configuração do Tenant</h3>
      </v-card-title>
      <v-form ref="form" class="ma-1 form-tenant">
        <v-row dense>
          <v-col>
            <v-text-field
              class="capitalize"
              :value="tenant.nome"
              label="Responsável *"
              :rules="rules.nome"
              @input="updateNome"
              validate-on-blur
              required
              autofocus
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="tenant.email"
              label="E-mail *"
              :rules="rules.email"
              @input="updateEmail"
              validate-on-blur
              required
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="3">
            <v-text-field
              v-mask="'#######'"
              label="CNES *"
              :value="tenant.cnes"
              :rules="rules.cnes"
              @input="updateCnes"
              @change="updateCnesMask"
              validate-on-blur
              required
            />
          </v-col>
          <v-col>
            <v-autocomplete
              return-object
              :value="tenant.municipioId"
              :rules="rules.municipioId"
              label="Município *"
              :items="municipios.items"
              item-text="nome"
              item-value="id"
              :loading="municipios.loading"
              @update:search-input="searchMunicipios"
              @input="updateMunicipioId"
              no-data-text="Município não encontrado"
              required
              validate-on-blur
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-textarea
              label="Token de Envio"
              :value="tenant.tokenSecretaria"
              @input="updateToken"
              hint="Token gerado pelo estado necessário para o envio das notificações."
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>

        <h3>Configurações Fechamento</h3>
        <v-row dense>
          <v-col>
            <v-text-field
              v-mask="'##:##'"
              :value="tenant.periodo"
              label="Período do tenant *"
              :rules="rules.periodo"
              @input="updatePeriodo"
              validate-on-blur
              required
            />
          </v-col>
        </v-row>
        <h4>Última alteração do período de fechamento</h4>
        <v-row dense>
          <v-col>
            <v-text-field :value="tenant.dtBloqueioFechamento" label="Data da alteração" readonly />
          </v-col>
          <v-col>
            <v-text-field :value="tenant.ultimoPeriodo" label="Último período" readonly />
          </v-col>
        </v-row>

        <h4>Municípios utilizados nos indicadores</h4>
        <v-row dense>
          <v-col>
            <v-autocomplete
              v-model="tenantMunicipioAdd"
              return-object
              label="Município *"
              :items="tenantMunicipios.items"
              item-text="nome"
              item-value="id"
              :loading="tenantMunicipios.loading"
              @update:search-input="searchTenantMunicipios"
              @input="updateFechamentoMunicipio"
              no-data-text="Município não encontrado"
              :rules="rules.tenantMunicipioAdd"
            />
          </v-col>
        </v-row>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="item in municipiosTenant.items"
              :key="item.id"
              @click="removeMunicipio(item)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.municipio"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="item.icon || 'mdi-delete'"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="salvarConfig" :loading="loading">Salvar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="tenant-form__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </v-container>
</template>
<style lang="sass" scoped>
.tenant-form
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
import { mask } from 'vue-the-mask';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import {
  required, maxLength, minLength, hourMinuteFormat, minLengthNumbers,
} from '@/validations/CommonValidations';
import TenantConfig from '@/entities/TenantConfig';
import TenantMunicipio from '@/entities/TenantMunicipio';
import TenantConfigService from '@/services/TenantConfigService';
import MunicipioService from '@/services/MunicipioService';
import keycloak from '@/services/KeycloakService';
import ErrorService from '@/services/ErrorService';

const StateForm = {
  NEW: 'NEW',
  EDIT: 'EDIT',
};

export default {
  directives: { mask },
  components: {
    HeaderTitle,
  },
  props: {
    id: String,
  },
  watch: {
    id(tenantId) {
      this.editarTenant(tenantId);
      return tenantId;
    },
  },
  data: () => ({
    stateForm: StateForm.NEW,
    searchMunicipio: null,
    tenant: new TenantConfig(),
    loading: false,
    showError: false,
    mensagemErro: null,
    showSuccess: false,
    mensagemSucesso: null,
    municipios: {
      loading: false,
      items: [],
    },
    municipiosTenant: {
      loading: false,
      items: [],
    },
    tenantMunicipioAdd: null,
    searchTenantMunicipio: null,
    tenantMunicipios: {
      loading: false,
      items: [],
    },
    rules: {
      nome: [required, maxLength(150), minLength(3)],
      email: [required, maxLength(150), minLength(3)],
      cnes: [required, minLengthNumbers(3)],
      municipioId: [required],
      periodo: [required, hourMinuteFormat],
      tenantMunicipioAdd: [],
    },
  }),
  computed: {
    title() {
      switch (this.stateForm) {
        case StateForm.EDIT: return 'Editar Configuração do Tenant';
        default: return 'Cadastrar Configuração do Tenant';
      }
    },
  },
  methods: {
    salvarConfig() {
      if (this.stateForm === StateForm.NEW) {
        this.cadastrarTenant();
      } else {
        this.atualizarTenant();
      }
    },
    cadastrarTenant() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id, ...config } = this.tenant.toRequestBody();
        TenantConfigService.save(config)
          .then(() => {
            this.tenant = new TenantConfig();
            this.searchMunicipio = null;
            this.limparTenantMunicipio();
            this.municipiosTenant.items = [];
            this.showSuccess = true;
            this.mensagemSucesso = 'Configuração cadastrada com sucesso.';
          })
          .catch((error) => {
            this.showError = true;
            this.mensagemErro = ErrorService.getMessage(error);
          })
          .finally(() => { this.loading = false; });
      }
    },
    definirTenant(data) {
      this.tenant = new TenantConfig({ ...data });
      this.searchMunicipio = null;
      this.findMunicipios(this.tenant.municipio);
      this.municipiosTenant.items = [...this.tenant.municipios];
      this.$refs.form.resetValidation();
    },
    atualizarTenant() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id, ...config } = this.tenant.toRequestBody();
        TenantConfigService.update(id, config)
          .then(({ data }) => {
            this.definirTenant(data);
            this.showSuccess = true;
            this.mensagemSucesso = 'Configuração atualizada com sucesso.';
          })
          .catch((error) => {
            this.showError = true;
            this.mensagemErro = ErrorService.getMessage(error);
          })
          .finally(() => { this.loading = false; });
      }
    },
    updateNome(nome) {
      this.tenant.nome = nome.toUpperCase();
    },
    updateEmail(email) {
      this.tenant.email = email;
    },
    updateCnes(cnes) {
      this.tenant.cnes = cnes;
    },
    updateCnesMask(cnes) {
      this.tenant.cnes = cnes.padStart(7, '0');
    },
    updatePeriodo(periodo) {
      this.tenant.periodo = periodo;
    },
    updateMunicipioId(municipio) {
      this.tenant.municipioId = municipio.id;
      this.tenant.municipio = municipio.nome;
    },
    updateToken(token) {
      this.tenant.tokenSecretaria = token;
    },
    searchMunicipios(search = '') {
      if (search === this.searchMunicipio) return;
      this.searchMunicipio = search ? search.trim().toUpperCase() : '';
      this.findMunicipios(this.searchMunicipio);
    },
    findMunicipios(searchMunicipio = '') {
      this.municipios.loading = true;
      MunicipioService.findAll(searchMunicipio)
        .then(({ data }) => {
          this.municipios.items = data;
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        })
        .finally(() => {
          this.municipios.loading = false;
        });
    },
    updateUnidadeId(unidadeSaudeId) {
      this.tenant.unidadeSaudeId = unidadeSaudeId;
    },
    buscarTenant(id) {
      this.loading = true;
      TenantConfigService.findById(id)
        .then(({ data }) => {
          this.definirTenant(data);
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        })
        .finally(() => { this.loading = false; });
    },
    editarTenant(id) {
      this.stateForm = StateForm.EDIT;
      this.buscarTenant(id);
    },
    removeMunicipio(item) {
      if (this.municipiosTenant.items.length === 1) {
        this.showError = true;
        this.mensagemErro = 'É obrigatório ter um município vinculado.';
        return;
      }
      const { id, municipioId } = item;
      if (!id) {
        this.municipiosTenant.items = this
          .municipiosTenant.items.filter((m) => m.municipioId !== municipioId);
        return;
      }
      TenantConfigService.deleteMunicipio(id)
        .then(() => {
          this.municipiosTenant.items = this
            .municipiosTenant.items.filter((m) => m.id !== id);
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        });
    },
    searchTenantMunicipios(search = '') {
      if (search === this.searchTenantMunicipio) return;
      this.searchTenantMunicipio = search ? search.trim().toUpperCase() : '';
      this.findTenantMunicipios(this.searchTenantMunicipio);
    },
    findTenantMunicipios(searchMunicipio = '') {
      this.tenantMunicipios.loading = true;
      MunicipioService.findAll(searchMunicipio)
        .then(({ data }) => {
          this.tenantMunicipios.items = data;
        })
        .catch((error) => {
          this.showError = true;
          this.mensagemErro = ErrorService.getMessage(error);
        })
        .finally(() => {
          this.tenantMunicipios.loading = false;
        });
    },
    limparTenantMunicipio() {
      this.$nextTick(() => {
        this.tenantMunicipioAdd = null;
        this.searchTenantMunicipio = null;
        this.findTenantMunicipios();
      });
    },
    updateFechamentoMunicipio(item) {
      const { id: municipioId, nome: municipio } = item;
      if (this.municipiosTenant.items.some((m) => m.municipioId === municipioId)) {
        this.limparTenantMunicipio();
        return;
      }
      const novoMunicipio = new TenantMunicipio({ municipioId, municipio });
      this.municipiosTenant.items = [...this.municipiosTenant.items, novoMunicipio];
      this.tenant.municipios = [...this.tenant.municipios, novoMunicipio];
      this.limparTenantMunicipio();
    },
    validateTenantMunicipio() {
      return this.municipiosTenant.items.length >= 1 || 'É obrigatório ter um município vinculado.';
    },
  },
  created() {
    this.rules.tenantMunicipioAdd.push(this.validateTenantMunicipio);
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SUPERVISOR');
    this.findMunicipios();
    this.findTenantMunicipios();
  },
};
</script>
