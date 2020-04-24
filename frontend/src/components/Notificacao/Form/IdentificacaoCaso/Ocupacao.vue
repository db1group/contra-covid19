<template>
  <v-row dense>
    <v-col cols="6">
      <v-select
        :value="suspeito.ocupacaoId"
        :rules="rules.ocupacaoId"
        label="Ocupação *"
        :items="ocupacoes"
        item-text="descricao"
        item-value="id"
        @input="updateOcupacao"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        :value="suspeito.ocupacao"
        label="Descrição da ocupação"
        @input="updateDescricaoOcupacao"
        :disabled="isOcupacaoDisable"
      />
    </v-col>
  </v-row>
</template>
<script>
import Pessoa from '@/entities/Pessoa';
import OcupacaoService from '@/services/OcupacaoService';
import {
  required,
} from '@/validations/CommonValidations';

export default {
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  data: () => ({
    ocupacoes: [],
    isOcupacaoDisable: true,
    rules: {
      ocupacaoId: [required],
    },
  }),
  methods: {
    updateDescricaoOcupacao(descricaoOcupacao) {
      this.$emit('update:updateDescricaoOcupacao', descricaoOcupacao);
    },
    updateOcupacao(ocupacao) {
      this.validateOcupacaoDisabled(ocupacao);
      this.$emit('update:ocupacao', ocupacao);
    },
    findOcupacoes() {
      OcupacaoService.findAll()
        .then(({ data }) => {
          this.ocupacoes = data;
        });
    },
    validateOcupacaoDisabled(ocupacao) {
      const validateOcupacao = this.ocupacoes.find((ocupacaoFilter) => ocupacaoFilter.id === ocupacao);

      if (validateOcupacao && validateOcupacao.descricao === 'Outro') {
        this.isOcupacaoDisable = false;
      } else {
        this.isOcupacaoDisable = true;
      }
    },
  },
  created() {
    this.findOcupacoes();
  },
};
</script>
