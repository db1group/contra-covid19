<template>
  <div>
    <v-row dense>
      <v-col
        cols="12"
        sm="4"
      >
        <v-select
          :value="suspeito.tipoDocumento"
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
          label="Número do documento *"
          @input="updateNumeroDocumento"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          :value="suspeito.nome"
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
          @input="updateDataDeNascimento"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import Pessoa from '@/entities/Pessoa';

const TIPOS_DOCUMENTO = [
  { key: 'CPF', value: 'CPF' },
  { key: 'RG', value: 'RG' },
  { key: 'CNH', value: 'CNH' },
  { key: 'SUS', value: 'Carteira do SUS' },
];

export default {
  directives: { mask },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  data: () => ({
    tiposDocumento: TIPOS_DOCUMENTO,
  }),
  methods: {
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
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
  },
};
</script>
