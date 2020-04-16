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
      <v-col
        cols="12"
        sm="4"
      >
        <v-select
          :value="suspeito.tipoDocumento"
          :rules="rules.tipoDocumento"
          label="Tipo de documento *"
          :items="tiposDocumento"
          item-text="value"
          item-value="key"
          @input="updateTipoDocumento"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-text-field
          :value="suspeito.numeroDocumento"
          :rules="rules.numeroDocumento"
          label="Número do documento *"
          @input="updateNumeroDocumento"
        />
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
          label="Nome da mãe"
          @input="updateNomeDaMae"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          :value="suspeito.sexo"
          class="mt-0"
          @change="updateSexo"
        >
          <template v-slot:label>
            <label class="primary--text body-1 font-weight-bold">Sexo</label>
          </template>
          <v-radio label="Masculino" value="M"/>
          <v-radio label="Feminino" value="F"/>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense v-if="suspeito.sexo === 'F'">
      <v-col cols="12">
        <v-radio-group
          :value="suspeito.gestante"
          class="mt-0"
          @change="updateGestante"
        >
          <template v-slot:label>
            <label class="primary--text body-1 font-weight-bold">Gestante</label>
          </template>
          <v-radio label="Sim" :value="true"/>
          <v-radio label="Não" :value="false"/>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="8" md="6">
        <v-select
          :value="suspeito.racaCor"
          label="Raça/Cor"
          :items="racasCores"
          item-text="value"
          item-value="key"
          @input="updateRacaCor"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
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
    </v-row>
  </div>
</template>
<script>
import { required, dateFormat, dateHourMinuteFormat } from '@/validations/CommonValidations';
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
      dataDeNascimento: [required, dateFormat],
    },
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
      if (sexo === 'M') {
        this.updateGestante();
      }
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
  },
};
</script>
