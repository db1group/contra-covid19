<template>
  <v-row dense>
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <v-text-field
        :value="suspeito.telefoneResidencial"
        label="Telefone residencial"
        v-mask="'(##) ####-####'"
        @input="updateTelefoneResidencial"
      />
    </v-col>
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <v-text-field
        :value="suspeito.telefoneCelular"
        label="Telefone celular"
        v-mask="'(##) #####-####'"
        @input="updateTelefoneCelular"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mask } from 'vue-the-mask';
import Pessoa from '@/entities/Pessoa';

export default {
  directives: { mask },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  methods: {
    updateTelefoneResidencial(telefoneResidencial) {
      this.$emit('update:telefoneResidencial', telefoneResidencial);
    },
    updateTelefoneCelular(telefoneCelular) {
      this.$emit('update:telefoneCelular', telefoneCelular);
    },
  },
};
</script>
