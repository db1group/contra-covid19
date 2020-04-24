<template>
  <v-row dense>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
        :value="suspeito.telefoneResidencial"
        type="tel"
        label="Telefone residencial"
        v-mask="'(##) ####-####'"
        :rules="rules.telefoneResidencial"
        @input="updateTelefoneResidencial"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
        :value="suspeito.telefoneCelular"
        type="tel"
        label="Telefone celular"
        v-mask="'(##) #####-####'"
        :rules="rules.telefoneCelular"
        @input="updateTelefoneCelular"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
        :value="suspeito.telefoneContato"
        type="tel"
        label="Telefone contato"
        v-mask="['(##) ####-####', '(##) #####-####']"
        :rules="rules.telefoneContato"
        @input="updateTelefoneContato"
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
  data: () => ({
    rules: {
      telefoneResidencial: [],
      telefoneCelular: [],
      telefoneContato: [],
    },
  }),
  methods: {
    updateTelefoneResidencial(telefoneResidencial) {
      this.$emit('update:telefoneResidencial', telefoneResidencial);
    },
    updateTelefoneCelular(telefoneCelular) {
      this.$emit('update:telefoneCelular', telefoneCelular);
    },
    updateTelefoneContato(telefoneContato) {
      this.$emit('update:telefoneContato', telefoneContato);
    },
    requiredAtLeastOnePhoneNumber() {
      if (this.suspeito.telefoneResidencial) {
        return true;
      }
      if (this.suspeito.telefoneCelular) {
        return true;
      }
      if (this.suspeito.telefoneContato) {
        return true;
      }
      return 'Pelo menos um telefone é obrigatório';
    },
  },
  created() {
    this.rules.telefoneResidencial.push(this.requiredAtLeastOnePhoneNumber);
    this.rules.telefoneCelular.push(this.requiredAtLeastOnePhoneNumber);
    this.rules.telefoneContato.push(this.requiredAtLeastOnePhoneNumber);
  },
};
</script>
