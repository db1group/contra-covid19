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
          :disabled="disabled"
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
          :disabled="disabled"
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
          :label="'Tipo de documento *'"
          :items="tiposDocumento"
          item-text="value"
          item-value="key"
          @input="updateTipoDocumento"
          :disabled="disabledTipoDocumento"
        />
      </v-col>
      <v-col cols="12" sm="5" md="5">
        <v-text-field
          v-show="suspeito.tipoDocumento === 'CPF'"
          :value="suspeito.numeroCpf"
          label="Número do documento *"
          v-mask="'###.###.###-##'"
          :rules="rules.numeroCpf"
          @input="updateNumeroCpf"
          :disabled="disabled"
        />
        <v-text-field
          v-show="suspeito.tipoDocumento !== 'CPF'"
          :value="suspeito.numeroDocumento"
          label="Número do documento"
          @input="updateNumeroDocumento"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6" md="5">
        <label class="primary--text body-1 font-weight-bold">Sexo *</label>
        <v-radio-group
          :value="suspeito.sexo"
          class="mt-0"
          @change="updateSexo"
          :rules="rules.sexo"
          row
          :disabled="disabled"
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
          :disabled="disabled"
        >
          <v-radio label="Sim" value="true" />
          <v-radio label="Não" value="false" />
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row dense v-show="suspeito.sexo === 'F' && suspeito.gestante === 'true'">
        <v-col cols="12" >
          <v-radio-group
            :value="suspeito.tipoPeriodoGestacional"
            :rules="rules.tipoPeriodoGestacional"
            @change="updateTipoPeriodoGestacional"
            :disabled="disabled"
          >
            <template v-slot:label>
              <label class="primary--text body-1 font-weight-bold">
                Período de gestação *
              </label>
            </template>
            <v-radio
              value="PRIMEIRO_TRIMESTRE"
              label="1º Trimestre" />
            <v-radio
              value="SEGUNDO_TRIMESTRE"
              label="2º Trimestre" />
            <v-radio
              value="TERCEIRO_TRIMESTRE"
              label="3º Trimestre" />
            <v-radio
              value="IDADE_GESTACIONAL_IGNORADA"
              label="Idade gestacional ignorada" />
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
          :disabled="disabled"
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
          :disabled="disabled"
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
          :disabled="disabled"
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
          :disabled="disabled"
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
    disabled: {
      type: Boolean,
      defaultValue: false,
    },

  },
  data: () => ({
    tiposDocumento: TIPOS_DOCUMENTO,
    racasCores: RACAS_CORES,
    rules: {
      dataHoraNotificacao: [required, dateHourMinuteFormat],
      tipoDocumento: [required],
      numeroCpf: [exactLength(14)],
      nome: [required],
      nomeDaMae: [required],
      dataDeNascimento: [required, dateFormat],
      sexo: [required],
      gestante: [],
      tipoPeriodoGestacional: [],
      racaCor: [required],
      tipoClassificacaoPessoa: [required],
    },
    disabledTipoDocumento: true,
    labelNumeroDocumento: 'Número do documento *',
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
    updateNumeroCpf(numeroCpf) {
      this.$emit('update:numeroCpf', numeroCpf);
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
      this.unselectTipoPeriodoGestacional();
    },
    updateRacaCor(racaCor) {
      this.$emit('update:racaCor', racaCor);
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
    updateTipoPeriodoGestacional(tipoPeriodoGestacional) {
      this.$emit('update:tipoPeriodoGestacional', tipoPeriodoGestacional);
    },
    unselectTipoPeriodoGestacional() {
      if (this.suspeito.sexo === 'M' || this.suspeito.gestante !== 'true') {
        this.$emit('update:tipoPeriodoGestacional', null);
      }
    },
    updateTipoClassificacaoPessoa(tipoClassificacaoPessoa) {
      this.disableTipoDocumento(tipoClassificacaoPessoa);
      this.$emit('update:tipoClassificacaoPessoa', tipoClassificacaoPessoa);
    },
    requiredIfSexoForFeminino(value) {
      if (this.suspeito.sexo === 'M') {
        return true;
      }
      return required(value);
    },
    requiredIfGestante(value) {
      if (this.suspeito.sexo === 'M' || this.suspeito.gestante !== 'true') {
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
    disableTipoDocumento(tipoClassificacaoPessoa) {
      if (this.disabled) {
        this.disabledTipoDocumento = true;
        return;
      }

      if (tipoClassificacaoPessoa === 'OUTRO') {
        this.disabledTipoDocumento = true;
        this.updateTipoDocumento('CPF');
        return;
      }

      this.disabledTipoDocumento = false;
    },
    requiredIfCpfAndTipoOutros(value) {
      if (this.suspeito.tipoDocumento !== 'CPF' || this.suspeito.tipoClassificacaoPessoa !== 'OUTROS') {
        return true;
      }
      return required(value);
    },
  },
  created() {
    this.rules.numeroCpf.push(this.requiredIfCpfAndTipoOutros);
    this.rules.gestante.push(this.requiredIfSexoForFeminino);
    this.rules.tipoPeriodoGestacional.push(this.requiredIfGestante);
    this.rules.dataDeNascimento.push(this.validateFutureDate);
  },
};
</script>
