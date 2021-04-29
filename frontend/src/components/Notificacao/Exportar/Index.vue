<template>
  <v-container fluid>
    <v-card class="mx-auto px-2" width="500">
      <v-card-title>
        <h3 class="primary--text">Exportar</h3>
      </v-card-title>
      <v-form ref="form" class="ma-2">
        <v-row dense>
          <v-col>
            <v-checkbox
              :value="exportar.previa"
              label="Prévia"
              color="black"
              hide-details
              @change="updatePrevia"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="exportar.dataInicial"
              label="Data criação inicial"
              append-icon="mdi-calendar-blank"
              v-mask="'##/##/####'"
              validate-on-blur
              :rules="rules.dataInicial"
              @input="updateDataInicial"
              ref="dataInicial"
              autofocus
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="exportar.dataFinal"
              label="Data criação final"
              append-icon="mdi-calendar-blank"
              v-mask="'##/##/####'"
              validate-on-blur
              :rules="rules.dataFinal"
              @input="updateDataFinal"
              ref="dataFinal"
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col align="center">OU</v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="exportar.dataEvolucaoInicial"
              label="Data evolução inicial"
              append-icon="mdi-calendar-blank"
              v-mask="'##/##/#### ##:##'"
              validate-on-blur
              :rules="rules.dataEvolucaoInicial"
              @input="updateDataEvolucaoInicial"
              ref="dataEvolucaoInicial"
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="exportar.dataEvolucaoFinal"
              label="Data evolução final"
              append-icon="mdi-calendar-blank"
              v-mask="'##/##/#### ##:##'"
              validate-on-blur
              :rules="rules.dataEvolucaoFinal"
              @input="updateDataEvolucaoFinal"
              ref="dataEvolucaoFinal"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn
                color="primary"
                rounded
                @click="onClick"
                :disabled="loading"
                :loading="loading"
              >
                <v-icon>mdi-download</v-icon>exportar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mask } from 'vue-the-mask';
import NotificacaoExportar from '@/entities/NotificacaoExportar';
import { required, dateHourMinuteFormat, mustBeEmpty } from '@/validations/CommonValidations';

export default {
  directives: { mask },
  props: {
    exportar: NotificacaoExportar,
    loading: [Boolean, null],
  },
  data: () => ({
    rules: {
      dataInicial: [],
      dataFinal: [],
      dataEvolucaoInicial: [],
      dataEvolucaoFinal: [],
    },
  }),
  methods: {
    updatePrevia(previa) {
      console.log('previa', previa);
      this.$emit('update:previa', previa);
    },
    updateDataInicial(dataInicial) {
      this.resetarValidacoes();
      this.$emit('update:dataInicial', dataInicial);
      this.$emit('update:dataEvolucaoInicial', null);
      this.$emit('update:dataEvolucaoFinal', null);
    },
    updateDataFinal(dataFinal) {
      this.resetarValidacoes();
      this.$emit('update:dataFinal', dataFinal);
      this.$emit('update:dataEvolucaoInicial', null);
      this.$emit('update:dataEvolucaoFinal', null);
    },
    updateDataEvolucaoInicial(dataInicial) {
      this.resetarValidacoes();
      this.$emit('update:dataEvolucaoInicial', dataInicial);
      this.$emit('update:dataInicial', null);
      this.$emit('update:dataFinal', null);
    },
    updateDataEvolucaoFinal(dataFinal) {
      this.resetarValidacoes();
      this.$emit('update:dataEvolucaoFinal', dataFinal);
      this.$emit('update:dataInicial', null);
      this.$emit('update:dataFinal', null);
    },
    resetarValidacoes() {
      this.$refs.dataInicial.resetValidation();
      this.$refs.dataFinal.resetValidation();
      this.$refs.dataEvolucaoInicial.resetValidation();
      this.$refs.dataEvolucaoFinal.resetValidation();
    },
    removeAllRules() {
      this.rules.dataInicial.pop();
      this.rules.dataFinal.pop();
      this.rules.dataEvolucaoInicial.pop();
      this.rules.dataEvolucaoFinal.pop();
      this.rules.dataEvolucaoInicial.pop();
      this.rules.dataEvolucaoFinal.pop();
    },
    isEmptyField(field) {
      return !field || field === '';
    },
    validateRules() {
      this.removeAllRules();
      if (!this.isEmptyField(this.exportar.dataEvolucaoInicial)
        || !this.isEmptyField(this.exportar.dataEvolucaoFinal)) {
        this.rules.dataInicial.push(mustBeEmpty);
        this.rules.dataFinal.push(mustBeEmpty);
        this.rules.dataEvolucaoInicial.push(required, dateHourMinuteFormat);
        this.rules.dataEvolucaoFinal.push(required, dateHourMinuteFormat);
      } else {
        this.rules.dataInicial.push(required);
        this.rules.dataFinal.push(required);
        this.rules.dataEvolucaoInicial.push(mustBeEmpty);
        this.rules.dataEvolucaoFinal.push(mustBeEmpty);
      }
    },
    onClick() {
      this.validateRules();
      if (this.$refs.form.validate()) {
        this.$emit('click');
      }
    },
  },
};
</script>
