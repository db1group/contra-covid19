<template>
  <div>
    <v-row dense>
      <v-col cols="5" sm="4">
        <v-text-field
          :value="dataHoraNotificacao"
          label="Data e hora da notificação *"
          v-mask="'##/##/#### ##:##'"
          validate-on-blur
          :rules="rules.dataHoraNotificacao"
          @input="updateDataHoraNotificacao"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          :value="suspeito.tipoClassificacaoPessoa"
          class="mt-0"
          @change="updateTipoClassificacaoPessoa"
          :rules="rules.tipoClassificacaoPessoa"
          row
        >
          <v-radio label="Criança até 12 anos" value="CRIANCA_ATE_12_ANOS" />
          <v-radio label="Em situação de Rua" value="EM_SITUACAO_RUA" />
          <v-radio label="Estrangeiro" value="ESTRANGEIRO" />
          <v-radio label="Indígena" value="INDIGENA" />
          <v-radio label="Outro" value="OUTRO" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="3" md="3">
        <v-select
          :value="suspeito.tipoDocumento"
          :rules="rules.tipoDocumento"
          label="Tipo de documento *"
          :items="tiposDocumento"
          item-text="value"
          item-value="key"
          @input="updateTipoDocumento"
          :disabled="disabledTipoDocumento"
        />
      </v-col>
      <v-col cols="12" sm="5" md="5">
        <v-text-field
          :value="suspeito.numeroDocumento"
          :rules="rules.numeroDocumento"
          label="Número do documento *"
          @input="updateNumeroDocumento"
        />
      </v-col>
    </v-row>
    <v-row dense><v-col cols="12" sm="6" md="5">
        <label class="primary--text body-1 font-weight-bold">Sexo *</label>
        <v-radio-group
          :value="suspeito.sexo"
          class="mt-0"
          @change="updateSexo"
          :rules="rules.sexo"
          row
        >
          <v-radio label="Masculino" value="M" />
          <v-radio label="Feminino" value="F" />
        </v-radio-group>
      </v-col>
      <v-col v-show="suspeito.sexo === 'F'" cols="12" sm="6">
        <label class="primary--text body-1 font-weight-bold">Gestante *</label>
        <v-radio-group
          :value="suspeito.gestante"
          class="mt-0"
          @change="updateGestante"
          :rules="rules.gestante"
          row
        >
          <v-radio label="Sim" value="true" />
          <v-radio label="Não" value="false" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          :value="suspeito.nome"
          :rules="rules.nome"
          label="Nome completo *"
          @input="updateNome"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          :value="suspeito.nomeDaMae"
          label="Nome da mãe *"
          @input="updateNomeDaMae"
          :rules="rules.nomeDaMae"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="5" md="5">
        <v-text-field
          :value="suspeito.dataDeNascimento"
          label="Data de nascimento *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          :rules="rules.dataDeNascimento"
          validate-on-blur
          @input="updateDataDeNascimento"
        />
      </v-col>
      <v-spacer />
      <v-col cols="12" sm="5" md="5">
        <v-select
          :value="suspeito.racaCor"
          :rules="rules.racaCor"
          label="Raça/Cor"
          :items="racasCores"
          item-text="value"
          item-value="key"
          @input="updateRacaCor"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  required, dateFormat, dateHourMinuteFormat, exactLength, lessThanMaximumDate,
} from '@/validations/CommonValidations';
import { mask } from 'vue-the-mask';
import Pessoa from '@/entities/Pessoa';

const TIPOS_DOCUMENTO = [
  { key: 'CPF', value: 'CPF' },
  { key: 'RG', value: 'RG' },
  { key: 'CNH', value: 'CNH' },
  { key: 'SUS', value: 'Carteira do SUS' },
];

const RACAS_CORES = [
  { key: 'BRANCA', value: 'Branca' },
  { key: 'PRETA', value: 'Preta' },
  { key: 'AMARELA', value: 'Amarela' },
  { key: 'PARDA', value: 'Parda' },
  { key: 'INDIGENA', value: 'Indígena' },
  { key: 'IGNORADO', value: 'Ignorado' },
];

export default {
  directives: { mask },
  props: {
    dataHoraNotificacao: {
      type: String,
      default: '',
    },
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  data: () => ({
    tiposDocumento: TIPOS_DOCUMENTO,
    racasCores: RACAS_CORES,
    rules: {
      dataHoraNotificacao: [required, dateHourMinuteFormat],
      tipoDocumento: [required],
      numeroDocumento: [required],
      nome: [required],
      nomeDaMae: [required],
      dataDeNascimento: [required, dateFormat],
      sexo: [required],
      gestante: [],
      racaCor: [required],
      tipoClassificacaoPessoa: [required],
    },
    disabledTipoDocumento: true,
  }),
  methods: {
    updateDataHoraNotificacao(dataHoraNotificacao) {
      this.$emit('update:dataHoraNotificacao', dataHoraNotificacao);
    },
    updateTipoDocumento(tipoDocumento) {
      this.$emit('update:tipoDocumento', tipoDocumento);
    },
    updateNumeroDocumento(numeroDocumento) {
      this.$emit('update:numeroDocumento', numeroDocumento);
    },
    updateNome(nome) {
      this.$emit('update:nome', nome);
    },
    updateNomeDaMae(nomeDaMae) {
      this.$emit('update:nomeDaMae', nomeDaMae);
    },
    updateSexo(sexo) {
      this.$emit('update:sexo', sexo);
      this.updateGestante();
    },
    updateGestante(gestante) {
      this.$emit('update:gestante', gestante);
    },
    updateRacaCor(racaCor) {
      this.$emit('update:racaCor', racaCor);
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
    updateTipoClassificacaoPessoa(tipoClassificacaoPessoa) {
      this.disbleTipoDocumento(tipoClassificacaoPessoa);
      this.$emit('update:tipoClassificacaoPessoa', tipoClassificacaoPessoa);
    },
    requiredIfSexoForFeminino(value) {
      if (this.suspeito.sexo === 'M') {
        return true;
      }
      return required(value);
    },
    maxLengthIfCPF(value) {
      if (this.suspeito.tipoDocumento !== 'CPF') {
        return true;
      }
      return exactLength(11)(value);
    },
    validateFutureDate(value) {
      return lessThanMaximumDate(value, null, 'Informe uma data igual ou anterior ao dia de hoje.');
    },
    disbleTipoDocumento(tipoClassificacaoPessoa) {
      if (tipoClassificacaoPessoa === 'OUTRO') {
        this.disabledTipoDocumento = true;
        this.updateTipoDocumento('CPF');
        return;
      }
      this.disabledTipoDocumento = false;
    },
  },
  created() {
    this.rules.gestante.push(this.requiredIfSexoForFeminino);
    this.rules.numeroDocumento.push(this.maxLengthIfCPF);
    this.rules.dataDeNascimento.push(this.validateFutureDate);
  },
};
</script>
