<template>
  <v-row dense>
    <v-col cols="12">
      <v-text-field
        :value="suspeito.ocupacao"
        label="Ocupação"
        @input="updateOcupacao"
      />
    </v-col>
  </v-row>
</template>
<script>
import Pessoa from '@/entities/Pessoa';

export default {
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  methods: {
    updateOcupacao(ocupacao) {
      this.$emit('update:ocupacao', ocupacao);
    },
  },
};
</script>
