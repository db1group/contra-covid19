<template>
  <v-row dense>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
        :value="suspeito.telefoneResidencial"
        ref="residencial"
        type="tel"
        label="Telefone residencial"
        v-mask="'(##) ####-####'"
        :rules="rules.telefoneResidencial"
        @input="updateTelefoneResidencial"
        :disabled="disabled"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
        :value="suspeito.telefoneCelular"
        ref="celular"
        type="tel"
        label="Telefone celular"
        v-mask="'(##) #####-####'"
        :rules="rules.telefoneCelular"
        @input="updateTelefoneCelular"
        :disabled="disabled"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
        :value="suspeito.telefoneContato"
        ref="contato"
        type="tel"
        label="Telefone contato"
        v-mask="['(##) ####-####', '(##) #####-####']"
        :rules="rules.telefoneContato"
        @input="updateTelefoneContato"
        :disabled="disabled"
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
    disabled: {
      type: Boolean,
      defaultValue: false,
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
      this.$refs.celular.validate();
      this.$refs.contato.validate();
    },
    updateTelefoneCelular(telefoneCelular) {
      this.$emit('update:telefoneCelular', telefoneCelular);
      this.$refs.residencial.validate();
      this.$refs.contato.validate();
    },
    updateTelefoneContato(telefoneContato) {
      this.$emit('update:telefoneContato', telefoneContato);
      this.$refs.residencial.validate();
      this.$refs.celular.validate();
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
