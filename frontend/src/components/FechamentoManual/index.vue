<template>
  <v-container fluid>
    <header-title title="Realizar Fechamento Manual" backRoute="fechamento-manual" />
  <v-card class="mx-auto" width="800" :loading="loading">
      <v-card-title>
        <h3 class="primary--text">Fechamento Manual</h3>
      </v-card-title>
      <v-form
        v-model="valid"
        lazy-validation
        ref="form"
        class="ma-2 fechamento-form">
        <v-row dense>
          <v-col cols="6" sm="6" md="6">
            <v-menu
              v-model="menuDataFechamento"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="dataFechamentoFormatada"
                  label="Data do último boletim *"
                  hint="Formato da data DD/MM/YYYY"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  validate-on-blur
                  :rules="rules.dataFechamento"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  @click:clear="fechamento.dataFechamento = null"
                  autofocus
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fechamento.dataFechamento"
                @input="menuDataFechamento = false"
                locale="pt-br"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              :value="fechamento.suspeitos"
              label="Total de notificados"
              :rules="rules.suspeitos"
              @input="updateField('suspeitos', $event)"
              v-mask="'#######'"
              validate-on-blur
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="fechamento.encerrados"
              label="Casos Encerrados"
              :rules="rules.encerrados"
              @input="updateField('encerrados', $event)"
              v-mask="'#######'"
              validate-on-blur
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="fechamento.descartados"
              label="Descartados"
              :rules="rules.descartados"
              @input="updateField('descartados', $event)"
              v-mask="'#######'"
              validate-on-blur
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="fechamento.recuperados"
              label="Total de recuperados"
              :rules="rules.recuperados"
              @input="updateField('recuperados', $event)"
              v-mask="'#######'"
              validate-on-blur
            />
          </v-col>
        </v-row>
        <h4>Casos por idade e sexo</h4>
        <v-form ref="form_casos" class="ma-2">
          <v-row dense>
            <v-col>
              <label>Tipo</label>
              <v-radio-group
                :value="caso.tipo"
                class="mt-0"
                @change="updateCaso('tipo', $event)"
                :rules="rules.caso.tipo"
                row
              >
                <v-radio label="Confirmado" value="C" />
                <v-radio label="Óbito" value="O" />
              </v-radio-group>
            </v-col>
            <v-col>
              <label>Sexo</label>
              <v-radio-group
                :value="caso.sexo"
                class="mt-0"
                @change="updateCaso('sexo', $event)"
                :rules="rules.caso.sexo"
                row
              >
                <v-radio label="Masculino" value="M" />
                <v-radio label="Feminino" value="F" />
              </v-radio-group>
            </v-col>
            <v-col cols="3">
              <v-select
                :value="caso.faixa"
                :rules="rules.caso.faixa"
                label="Faixa Etária"
                :items="tiposFaixa"
                item-text="value"
                item-value="key"
                @input="updateCaso('faixa', $event)"
              />
            </v-col>
            <v-col cols="2">
              <v-text-field
                :value="caso.qtde"
                label="Quantidade"
                :rules="rules.caso.qtde"
                @input="updateCaso('qtde', $event)"
                v-mask="'#######'"
                validate-on-blur
              />
            </v-col>
            <v-col align-self="center" cols="2">
              <v-btn
                small
                rounded
                color="primary"
                @click="adicionarCaso"
              >
                Adicionar
              </v-btn>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-data-table
                dense
                :headers="headers"
                :items="fechamento.casos"
                :items-per-page="10"
                class="elevation-1"
                no-data-text="Não há casos por idade ou sexo."
              >
                <template v-slot:item.tipo="{ item }">
                  <span>{{ descricaoTipo(item.tipo) }}</span>
                </template>
                <template v-slot:item.sexo="{ item }">
                  <span>{{ descricaoSexo(item.sexo) }}</span>
                </template>
                <template v-slot:item.faixa="{ item }">
                  <span>{{ tiposFaixas.filter(t => t.key === item.faixa)[0].value }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                   <v-btn
                    small
                    text
                    rounded
                    color="#F54D09"
                    class="ml-5"
                    @click="excluirCaso(item)"
                  >EXCLUIR</v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row dense>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="realizarFechamento" :loading="loading">Salvar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="fechamento-form__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </v-container>
</template>
<style lang="sass" scoped>
.fechamento-form
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
import moment from 'moment';
import { mask } from 'vue-the-mask';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import FechamentoManual from '@/entities/FechamentoManual';
import {
  required, onlyCardinalNumbers, dateFormat, dateMustBeLesserEqualsThanToday,
} from '@/validations/CommonValidations';
import FechamentoService from '@/services/FechamentoService';
import ErrorService from '@/services/ErrorService';

const TIPOS_FAIXA = [
  { value: '< 5 ANOS', key: '0 A 5' },
  { value: '5 A 9 ANOS', key: '5 A 9' },
  { value: '10 A 19 ANOS', key: '10 A 19' },
  { value: '20 A 29 ANOS', key: '20 A 29' },
  { value: '30 A 39 ANOS', key: '30 A 39' },
  { value: '40 A 49 ANOS', key: '40 A 49' },
  { value: '50 A 59 ANOS', key: '50 A 59' },
  { value: '60 A 69 ANOS', key: '60 A 69' },
  { value: '70 A 79 ANOS', key: '70 A 79' },
  { value: '80 ANOS OU MAIS', key: '80 OU MAIS' },
];

export default {
  directives: { mask },
  components: {
    HeaderTitle,
  },
  data: () => ({
    valid: true,
    loading: false,
    showError: false,
    mensagemErro: null,
    showSuccess: false,
    mensagemSucesso: null,
    rules: {
      dataFechamento: [required, dateFormat, dateMustBeLesserEqualsThanToday],
      suspeitos: [onlyCardinalNumbers],
      encerrados: [onlyCardinalNumbers],
      descartados: [onlyCardinalNumbers],
      recuperados: [onlyCardinalNumbers],
      caso: {
        tipo: [required],
        sexo: [required],
        faixa: [required],
        qtde: [required],
      },
    },
    menuDataFechamento: false,
    fechamento: new FechamentoManual(),
    tiposFaixa: TIPOS_FAIXA,
    headers: [
      { text: 'Tipo', value: 'tipo' },
      { text: 'Sexo', value: 'sexo' },
      { text: 'Faixa etária', value: 'faixa' },
      { text: 'Quantidade', value: 'qtde' },
      { value: 'actions', sortable: false },
    ],
    caso: {
      tipo: '',
      sexo: '',
      faixa: '',
      qtde: 0,
    },
  }),
  methods: {
    realizarFechamento() {
      this.$refs.form_casos.resetValidation();
      if (this.$refs.form.validate()) {
        this.loading = true;
        const fechamento = this.fechamento.toRequestBody();
        FechamentoService.realizarFechamentoManual(fechamento)
          .then(() => {
            this.limparCamposCaso();
            this.fechamento = new FechamentoManual();
            this.$refs.form.resetValidation();
            this.showSuccess = true;
            this.mensagemSucesso = 'Fechamento manual realizado com sucesso.';
            setTimeout(() => {
              this.$router.push({ name: 'fechamento-manual' });
            }, 1500);
          })
          .catch((error) => {
            this.showError = true;
            this.mensagemErro = ErrorService.getMessage(error);
          })
          .finally(() => { this.loading = false; });
      }
    },
    updateField(field, value) {
      this.fechamento[field] = value;
    },
    updateCaso(field, value) {
      this.caso[field] = value;
    },
    limparCamposCaso() {
      this.caso = {
        tipo: '',
        sexo: '',
        faixa: '',
        qtde: 0,
      };
    },
    adicionarCaso() {
      this.$refs.form.resetValidation();
      if (this.$refs.form_casos.validate()) {
        this.fechamento.casos = [...this.fechamento.casos, { ...this.caso, index: this.fechamento.casos.length || 0 }];
        this.$refs.form_casos.resetValidation();
        this.limparCamposCaso();
      }
    },
    descricaoTipo(tipo) {
      return tipo === 'C' ? 'Confirmado' : 'Óbito';
    },
    descricaoSexo(sexo) {
      return sexo === 'M' ? 'Masculino' : 'Feminino';
    },
    excluirCaso({ index }) {
      this.fechamento.casos = this.fechamento.casos.filter((c) => c.index !== index);
    },
  },
  computed: {
    dataFechamentoFormatada() {
      return this.fechamento.dataFechamento ? moment(this.fechamento.dataFechamento).format('DD/MM/YYYY') : '';
    },
    tiposFaixas() {
      return TIPOS_FAIXA;
    },
  },
};
</script>
