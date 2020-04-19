<template>
  <v-card class="mx-auto" width="350">
    <v-card-title>
      <h3 class="primary--text">Atualização</h3>
    </v-card-title>
    <v-container fluid>
      <v-form ref="form" v-model="valid">
        <v-row align="center">
          <v-col cols="8">
            <v-text-field
              :value="dataHoraNotificacao"
              label="Data e hora da notificação *"
              v-mask="'##/##/#### ##:##'"
              validate-on-blur
              :rules="rules.dataHoraNotificacao"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              :value="localIsolamento"
              :rules="rules.localIsolamento"
              label="Local do isolamento *"
              :items="locais.items"
              item-text="value"
              item-value="key"
              :loading="locais.loading"
              no-data-text="Local de isolamento não encontrado"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              :value="situacaoPaciente"
              :rules="rules.situacaoPaciente"
              label="Local do isolamento *"
              :items="situacoes.items"
              item-text="value"
              item-value="key"
              :loading="situacoes.loading"
              no-data-text="Situação do paciente não encontrada"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded>ATUALIZAR NOTIFICÃO</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { required, dateHourMinuteFormat } from '@/validations/CommonValidations';
import { mask } from 'vue-the-mask';

const LOCAIS = [
  { key: 'ALTA_ISOLAMENTO_DOMICILIAR', value: 'Alta com isolamento domiciliar' },
  { key: 'INTERNAMENTO_LEITO_COMUM', value: 'Hospitalizado – Leito comum' },
  { key: 'INTERNAMENTO_LEITO_UTI', value: 'Hospitalizado - Leito UTI' },
];

const SITUACOES = [
  { key: 'SUSPEITO', value: 'Suspeito' },
  { key: 'CONFIRMADO', value: 'Confirmado' },
  { key: 'DESCARTADO', value: 'Descartado' },
  { key: 'CURA', value: 'Curado' },
  { key: 'ENCERRADO', value: 'Encerrado' },
  { key: 'OBITO', value: 'Óbito' },
];

export default {
  directives: { mask },
  props: {
    notificacaoId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    valid: true,
    dataHoraNotificacao: '',
    localIsolamento: '',
    situacaoPaciente: '',
    locais: {
      items: [],
      loading: true,
    },
    situacoes: {
      items: [],
      loading: true,
    },
    rules: {
      dataHoraNotificacao: [required, dateHourMinuteFormat],
      localIsolamento: [required],
      situacaoPaciente: [required],
    },
  }),
  methods: {
    loadLocais() {
      this.locais.loading = true;
      setTimeout(() => {
        this.locais.items = LOCAIS;
        this.locais.loading = false;
      }, 2000);
    },
    loadSituacoes() {
      this.situacoes.loading = true;
      setTimeout(() => {
        this.situacoes.items = SITUACOES;
        this.situacoes.loading = false;
      }, 2000);
    },
  },
  created() {
    this.loadLocais();
    this.loadSituacoes();
  },
};
</script>
