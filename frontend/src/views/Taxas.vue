 <template>
 <section style="margin-top: 45px;">
  <v-container fluid>
    <header-title title="Fechamento diário" back-route="fechamento-diario" />
          <v-row justify="space-between" align="center">
      </v-row>


    <v-card class="mx-auto" width="500" :loading="loading">
      <v-row justify="space-between" align="center">
        <v-card-title>
          <h3 class="primary--text">Taxas</h3>
        </v-card-title>
        <v-card-title>
          <h3 class="primary--text">Fechamento: {{getDateFormat(dtfechamento)}}</h3>
        </v-card-title>
      </v-row>
      <v-form ref="form" class="ma-2 form-unid">
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              v-model="taxa.positividade"
              type="number"
              prefix="%"
              label="Positividade"
              :rules="rules.positividade"
              validate-on-blur
              required
              autofocus
              :disabled="possuiTaxa"
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              v-model="taxa.ocupacao"
              type="number"
              prefix="%"
              label="Ocupação"
              :rules="rules.ocupacao"
              validate-on-blur
              required
              :disabled="possuiTaxa"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="salvar" :loading="loading" :disabled="possuiTaxa">Salvar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="taxa-form__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </v-container>
 </section>
</template>
<script>
import {
  required,
} from '@/validations/CommonValidations';
import keycloak from '@/services/KeycloakService';
import moment from 'moment';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import Taxa from '@/entities/Taxa';
import TaxaService from '@/services/TaxaService';

export default {
  props: {
    id: String,
  },
  components: {
    HeaderTitle,
  },
  data: () => ({
    taxa: new Taxa(),
    dtfechamento: '',
    loading: false,
    showError: false,
    mensagemErro: null,
    showSuccess: false,
    mensagemSucesso: null,
    rules: {
      positividade: [required],
      ocupacao: [required],
    },
    isSecretariaSaude: false,
  }),
  methods: {
    getDateFormat(value) {
      return moment.utc(value).format('DD/MM/YYYY');
    },
    salvar() {
      if (this.taxa.id) {
        TaxaService.update(this.taxa.id, this.taxa);
      } else {
        const { dtfechamento, ocupacao, positividade } = this.taxa;
        TaxaService.save({ dtfechamento, ocupacao, positividade }).then(() => {
          this.showSuccess = true;
          this.mensagemSucesso = 'Taxas cadastradas com sucesso';
          setTimeout(() => {
            this.$router.push({ name: 'fechamento-diario' });
          }, 1500);
        }, (err) => {
          this.showError = true;
          this.mensagemErro = err.response.data.error;
        }).catch(() => {
          this.showError = true;
          this.mensagemSucesso = 'Não foi possível realizar o cadastro de taxas.';
        });
      }
    },
    setDataFechamento(dtfechamento) {
      this.dtfechamento = dtfechamento;
      this.taxa = new Taxa({ dtfechamento });
      TaxaService.findByDataFechamento(moment(dtfechamento).format('YYYY-MM-DD')).then((res) => {
        this.taxa = res.data.taxa;
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    const { dataFechamento } = to.params;
    let enter = true;
    enter = (vm) => vm.setDataFechamento(atob(dataFechamento));
    next(enter);
  },
  created() {
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
  },
  computed: {
    possuiTaxa() {
      return this.taxa.id !== null;
    },
  },
};
</script>
