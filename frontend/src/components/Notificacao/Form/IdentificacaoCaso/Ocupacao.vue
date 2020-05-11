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
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        :value="suspeito.ocupacao"
        :rules="rules.ocupacao"
        label="Descrição da ocupação"
        @input="updateDescricaoOcupacao"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
</template>
<script>
import Pessoa from '@/entities/Pessoa';
import OcupacaoService from '@/services/OcupacaoService';
import {
  required, minLength,
} from '@/validations/CommonValidations';

export default {
  props: {
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
    ocupacoes: [],
    rules: {
      ocupacaoId: [required],
      ocupacao: [minLength(3)],
    },
  }),
  methods: {
    updateDescricaoOcupacao(descricaoOcupacao) {
      this.$emit('update:updateDescricaoOcupacao', descricaoOcupacao);
    },
    updateOcupacao(ocupacao) {
      this.$emit('update:ocupacao', ocupacao);
    },
    findOcupacoes() {
      OcupacaoService.findAll()
        .then(({ data }) => {
          this.ocupacoes = data;
        });
    },
  },
  created() {
    this.findOcupacoes();
  },
};
</script>
