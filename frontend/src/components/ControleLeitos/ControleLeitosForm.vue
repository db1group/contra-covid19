 <template>
  <v-container fluid>
    <header-title :title="title" backRoute="controle-leitos-cons" />
    <v-card class="mx-auto" width="500">
      <v-card-title>
        <h3 class="primary--text">Controle de Leitos</h3>
      </v-card-title>
      <v-form ref="form" class="ma-2 form-unid">
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              :value="unidade.nome"
              label="Unidade de Saúde"
              :rules="rules.nome"
              @input="updateNome"
              validate-on-blur
              required
              autofocus
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col cols="8">
            <v-autocomplete
              :value="unidade.municipioId"
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
          <v-col cols="4">
            <v-text-field
              label="CNES"
              :value="unidade.cnes"
              :rules="rules.cnes"
              @input="updateCNES"
              validate-on-blur
              required
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <h3 class="primary--text">Leitos Existentes</h3>
          </v-col>
        </v-row>
        <v-row align="center" no-gutters class="primary--text px-2">
          <v-col cols="4"></v-col>
          <v-col cols="4" align="center" class="font-weight-bold pr-8">Sus</v-col>
          <v-col />
        </v-row>
        <v-row align="center" no-gutters class="primary--text px-2">
          <v-col cols="4"></v-col>
          <v-col cols="2" class="font-weight-bold">Covid</v-col>
          <v-col cols="2" class="font-weight-bold">Normal</v-col>
          <v-col cols="2" class="font-weight-bold">Privado</v-col>
          <v-col class="total-header">Total</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">Enfermaria</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtEnfermariaCovid"
              :rules="rules.leitos"
              validate-on-blur
              @input="updateEnfermariaCovid"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtEnfermariaNormal"
              :rules="rules.leitos"
              @input="updateEnfermariaNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtEnfermariaPrivado"
              :rules="rules.leitos"
              @input="updateEnfermariaPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{unidade.totalEnfermarias()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Adulta</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTIAdultaCovid"
              :rules="rules.leitos"
              @input="updateUTIAdultaCovid"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTIAdultaNormal"
              :rules="rules.leitos"
              @input="updateUTIAdultaNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTIAdultaPrivado"
              :rules="rules.leitos"
              @input="updateUTIAdultaPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{unidade.totalUTIAdulta()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Ped.</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTIPedCovid"
              :rules="rules.leitos"
              @input="updateUTIPedCovid"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTIPedNormal"
              :rules="rules.leitos"
              @input="updateUTIPedNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTIPedPrivado"
              :rules="rules.leitos"
              @input="updateUTIPedPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{unidade.totalUTIPed()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Neo.</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTINeoCovid"
              :rules="rules.leitos"
              @input="updateUTINeoCovid"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTINeoNormal"
              :rules="rules.leitos"
              @input="updateUTINeoNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="unidade.qtUTINeoPrivado"
              :rules="rules.leitos"
              @input="updateUTINeoPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{unidade.totalUTINeo()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2 footer-total">
          <v-col cols="4" class="footer-col">TOTAL</v-col>
          <v-col cols="2" class="footer-col">{{unidade.totalCovid()}}</v-col>
          <v-col cols="2" class="footer-col">{{unidade.totalNormal()}}</v-col>
          <v-col cols="2" class="footer-col">{{unidade.totalPrivado()}}</v-col>
          <v-col class="footer-col" />
        </v-row>
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
      class="unidade-form__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </v-container>
</template>
<style lang="sass" scoped>
.unidade-form
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
</style>
<style scoped>
  .form-unid .v-text-field,
  .form-unid .v-input__slot,
  .form-unid .v-input__control {
    margin: 0;
    padding: 0;
  }
  .form-unid .field-num {
    max-width: 60px;
  }
  .total,
  .total-header,
  .footer-col  {
    color: black;
    background-color: grey;
    font-weight: 700;
  }
  .total {
    height: 54px;
    text-align: center;
  }
  .total-header {
    text-align: center;
  }
  .footer-total {
    margin-right: 8px;
    padding: 8px 0;
    background-color: grey;
  }
</style>
<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import {
  required, maxLength, minLength, minLengthNumbers,
  onlyCardinalNumbers,
} from '@/validations/CommonValidations';
import UnidadeSaude from '@/entities/UnidadeSaude';
import MunicipioService from '@/services/MunicipioService';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';

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
    id(unidadeId) {
      this.editarUnidade(unidadeId);
      return unidadeId;
    },
  },
  data: () => ({
    stateForm: StateForm.NEW,
    searchMunicipio: null,
    unidade: new UnidadeSaude(),
    loading: false,
    showError: false,
    mensagemErro: null,
    showSuccess: false,
    mensagemSucesso: null,
    municipios: {
      loading: false,
      items: [],
    },
    rules: {
      nome: [required, maxLength(150), minLength(3)],
      municipioId: [required],
      cnes: [required, minLengthNumbers(3)],
      leitos: [onlyCardinalNumbers],
    },
  }),
  computed: {
    title() {
      switch (this.stateForm) {
        case StateForm.EDIT: return 'Editar Unidade de Saúde';
        default: return 'Cadastrar Unidade de Saúde';
      }
    },
  },
  methods: {
    salvarUnidade() {
      if (this.stateForm === StateForm.NEW) {
        this.cadastrarUnidade();
      } else {
        this.atualizarUnidade();
      }
    },
    cadastrarUnidade() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        UnidadeSaudeService.save(this.unidade.toRequestBody())
          .then(() => {
            this.unidade = new UnidadeSaude();
            this.showSuccess = true;
            this.mensagemSucesso = 'Unidade de Saúde cadastrada com sucesso.';
          })
          .catch(({ response }) => {
            this.showError = true;
            this.mensagemErro = response.data.error;
          })
          .finally(() => { this.loading = false; });
      }
    },
    atualizarUnidade() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id } = this.unidade;
        UnidadeSaudeService.update(id, this.unidade.toRequestBody())
          .then(() => {
            this.showSuccess = true;
            this.mensagemSucesso = 'Unidade de Saúde atualizada com sucesso.';
          })
          .catch(({ response }) => {
            this.showError = true;
            this.mensagemErro = response.data.error;
          })
          .finally(() => { this.loading = false; });
      }
    },
    updateNome(nome) {
      this.unidade.nome = nome;
    },
    updateCNES(cnes) {
      this.unidade.cnes = cnes;
    },
    updateEnfermariaCovid(qtEnfermaria) {
      this.unidade.qtEnfermariaCovid = qtEnfermaria;
    },
    updateEnfermariaNormal(qtEnfermaria) {
      this.unidade.qtEnfermariaNormal = qtEnfermaria;
    },
    updateEnfermariaPrivado(qtEnfermaria) {
      this.unidade.qtEnfermariaPrivado = qtEnfermaria;
    },
    updateUTIAdultaCovid(qtUTIAdulta) {
      this.unidade.qtUTIAdultaCovid = qtUTIAdulta;
    },
    updateUTIAdultaNormal(qtUTIAdulta) {
      this.unidade.qtUTIAdultaNormal = qtUTIAdulta;
    },
    updateUTIAdultaPrivado(qtUTIAdulta) {
      this.unidade.qtUTIAdultaPrivado = qtUTIAdulta;
    },
    updateUTIPedCovid(qtUTIAdulta) {
      this.unidade.qtUTIPedCovid = qtUTIAdulta;
    },
    updateUTIPedNormal(qtUTIAdulta) {
      this.unidade.qtUTIPedNormal = qtUTIAdulta;
    },
    updateUTIPedPrivado(qtUTIAdulta) {
      this.unidade.qtUTIPedPrivado = qtUTIAdulta;
    },
    updateUTINeoCovid(qtUTIAdulta) {
      this.unidade.qtUTINeoCovid = qtUTIAdulta;
    },
    updateUTINeoNormal(qtUTIAdulta) {
      this.unidade.qtUTINeoNormal = qtUTIAdulta;
    },
    updateUTINeoPrivado(qtUTIAdulta) {
      this.unidade.qtUTINeoPrivado = qtUTIAdulta;
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
        .finally(() => { this.municipios.loading = false; });
    },
    updateMunicipioId(municipioId) {
      this.unidade.municipioId = municipioId;
    },
    buscarUnidade(id) {
      this.loading = true;
      UnidadeSaudeService.findById(id)
        .then(({ data }) => {
          this.unidade = new UnidadeSaude({ ...data, municipio: data.Municipio.municipio });
          this.findMunicipios(this.unidade.municipio);
        })
        .catch(({ response }) => {
          this.showError = true;
          this.mensagemErro = response.data.error;
        })
        .finally(() => { this.loading = false; });
    },
    editarUnidade(id) {
      this.stateForm = StateForm.EDIT;
      this.unidade.id = id;
      this.buscarUnidade(id);
    },
  },
  created() {
    this.findMunicipios();
  },
};
</script>
