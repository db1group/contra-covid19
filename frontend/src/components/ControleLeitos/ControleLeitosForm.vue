 <template>
  <v-container fluid>
    <header-title :title="title" backRoute="controle-leitos-cons" />
    <v-card class="mx-auto" width="500">
      <v-card-title>
        <h3 class="primary--text">Controle de Leitos</h3>
      </v-card-title>
      <v-form ref="form" class="ma-2 form-unid">
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
              :value="controleLeito.qtEnfermariaCovid"
              :rules="rules.leitos"
              validate-on-blur
              @input="updateEnfermariaCovid"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtEnfermariaNormal"
              :rules="rules.leitos"
              @input="updateEnfermariaNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtEnfermariaPrivado"
              :rules="rules.leitos"
              @input="updateEnfermariaPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{controleLeito.totalEnfermarias()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Adulta</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTIAdultaCovid"
              :rules="rules.leitos"
              @input="updateUTIAdultaCovid"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTIAdultaNormal"
              :rules="rules.leitos"
              @input="updateUTIAdultaNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTIAdultaPrivado"
              :rules="rules.leitos"
              @input="updateUTIAdultaPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{controleLeito.totalUTIAdulta()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Ped.</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTIPedCovid"
              :rules="rules.leitos"
              @input="updateUTIPedCovid"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTIPedNormal"
              :rules="rules.leitos"
              @input="updateUTIPedNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTIPedPrivado"
              :rules="rules.leitos"
              @input="updateUTIPedPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{controleLeito.totalUTIPed()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Neo.</v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTINeoCovid"
              :rules="rules.leitos"
              @input="updateUTINeoCovid"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTINeoNormal"
              :rules="rules.leitos"
              @input="updateUTINeoNormal"
              validate-on-blur
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              class="field-num"
              :value="controleLeito.qtUTINeoPrivado"
              :rules="rules.leitos"
              @input="updateUTINeoPrivado"
              validate-on-blur
            />
          </v-col>
          <v-col class="total">{{controleLeito.totalUTINeo()}}</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2 footer-total">
          <v-col cols="4" class="footer-col">TOTAL</v-col>
          <v-col cols="2" class="footer-col">{{controleLeito.totalCovid()}}</v-col>
          <v-col cols="2" class="footer-col">{{controleLeito.totalNormal()}}</v-col>
          <v-col cols="2" class="footer-col">{{controleLeito.totalPrivado()}}</v-col>
          <v-col class="footer-col" />
        </v-row>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="salvarControleLeito" :loading="loading">Salvar</v-btn>
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
  onlyCardinalNumbers,
} from '@/validations/CommonValidations';
import ControleLeito from '@/entities/ControleLeito';
import ControleLeitoService from '@/services/ControleLeitoService';
import DateService from '@/services/DateService';

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
    id(controleLeitoId) {
      this.editarControleLeito(controleLeitoId);
      return controleLeitoId;
    },
  },
  data: () => ({
    stateForm: StateForm.NEW,
    controleLeito: new ControleLeito(),
    loading: false,
    showError: false,
    mensagemErro: null,
    showSuccess: false,
    mensagemSucesso: null,
    user: {},
    rules: {
      leitos: [onlyCardinalNumbers],
    },
  }),
  computed: {
    title() {
      switch (this.stateForm) {
        case StateForm.EDIT: return 'Editar Controle de Leitos';
        default: return 'Cadastrar Controle de Leitos';
      }
    },
  },
  methods: {
    salvarControleLeito() {
      if (this.stateForm === StateForm.NEW) {
        this.cadastrarControleLeito();
      } else {
        this.atualizarControleLeito();
      }
    },
    cadastrarControleLeito() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        ControleLeitoService.save({
          dtNotificacao: DateService.toMomentObject(
            DateService.formatNowAsStringDateTime(),
            'DD/MM/YYYY HH:mm',
          ).toISOString(),
          ControleLeito: this.controleLeito.toRequestBody(),
        }, this.user.unidadeSaudeId)
          .then(() => {
            this.controleLeito = new ControleLeito();
            this.showSuccess = true;
            this.mensagemSucesso = 'Controle de Leitos cadastrada com sucesso.';
          })
          .catch(({ response }) => {
            this.showError = true;
            this.mensagemErro = response.data.error;
          })
          .finally(() => { this.loading = false; });
      }
    },
    atualizarControleLeito() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        ControleLeitoService.update({
          dtNotificacao: DateService.toMomentObject(
            DateService.formatNowAsStringDateTime(),
            'DD/MM/YYYY HH:mm',
          ).toISOString(),
          ControleLeito: this.controleLeito.toRequestBody(),
        }, this.user.unidadeSaudeId, this.id)
          .then(() => {
            this.showSuccess = true;
            this.mensagemSucesso = 'Controle de Leitos atualizada com sucesso.';
          })
          .catch(({ response }) => {
            this.showError = true;
            this.mensagemErro = response.data.error;
          })
          .finally(() => { this.loading = false; });
      }
    },
    updateEnfermariaCovid(qtEnfermaria) {
      this.controleLeito.qtEnfermariaCovid = qtEnfermaria;
    },
    updateEnfermariaNormal(qtEnfermaria) {
      this.controleLeito.qtEnfermariaNormal = qtEnfermaria;
    },
    updateEnfermariaPrivado(qtEnfermaria) {
      this.controleLeito.qtEnfermariaPrivado = qtEnfermaria;
    },
    updateUTIAdultaCovid(qtUTIAdulta) {
      this.controleLeito.qtUTIAdultaCovid = qtUTIAdulta;
    },
    updateUTIAdultaNormal(qtUTIAdulta) {
      this.controleLeito.qtUTIAdultaNormal = qtUTIAdulta;
    },
    updateUTIAdultaPrivado(qtUTIAdulta) {
      this.controleLeito.qtUTIAdultaPrivado = qtUTIAdulta;
    },
    updateUTIPedCovid(qtUTIAdulta) {
      this.controleLeito.qtUTIPedCovid = qtUTIAdulta;
    },
    updateUTIPedNormal(qtUTIAdulta) {
      this.controleLeito.qtUTIPedNormal = qtUTIAdulta;
    },
    updateUTIPedPrivado(qtUTIAdulta) {
      this.controleLeito.qtUTIPedPrivado = qtUTIAdulta;
    },
    updateUTINeoCovid(qtUTIAdulta) {
      this.controleLeito.qtUTINeoCovid = qtUTIAdulta;
    },
    updateUTINeoNormal(qtUTIAdulta) {
      this.controleLeito.qtUTINeoNormal = qtUTIAdulta;
    },
    updateUTINeoPrivado(qtUTIAdulta) {
      this.controleLeito.qtUTINeoPrivado = qtUTIAdulta;
    },
    buscarControleLeito(id) {
      this.loading = true;
      ControleLeitoService.findByControleLeitoId(this.user.unidadeSaudeId, id)
        .then(({ data }) => {
          this.controleLeito = new ControleLeito(data.ControleLeito);
        })
        .catch(({ response }) => {
          this.showError = true;
          this.mensagemErro = response.data.error;
        })
        .finally(() => { this.loading = false; });
    },
    editarControleLeito(id) {
      this.stateForm = StateForm.EDIT;
      this.controleLeito.id = id;
      this.buscarControleLeito(id);
    },
  },
  created() {
    this.user = this.$store.state.user;
  },
};
</script>
