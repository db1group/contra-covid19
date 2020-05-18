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
        ref="ocupacao"
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
  required, minLength, maxLength,
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
      ocupacao: [],
    },
  }),
  methods: {
    updateDescricaoOcupacao(descricaoOcupacao) {
      this.$emit('update:updateDescricaoOcupacao', descricaoOcupacao);
    },
    updateOcupacao(ocupacao) {
      this.$emit('update:ocupacao', ocupacao);
      this.validateDescricaoOcupacaoIsRequired(ocupacao);
    },
    validateDescricaoOcupacaoIsRequired(ocupacao) {
      const ocupacaoSelecionada = this.ocupacoes.find((el) => el.id === ocupacao);
      if (ocupacaoSelecionada.descricao === 'Outro') {
        this.rules.ocupacao.push(required);
      } else {
        this.rules.ocupacao = [minLength(3), maxLength(60)];
      }
      this.$refs.ocupacao.validate();
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
