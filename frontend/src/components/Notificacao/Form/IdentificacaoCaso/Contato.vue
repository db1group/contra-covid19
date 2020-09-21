<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="6">
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
    <v-col cols="12" sm="6" md="6">
      <v-text-field
        :value="suspeito.telefoneCelular"
        ref="celular"
        type="tel"
        label="Telefone celular *"
        v-mask="'(##) #####-####'"
        :rules="rules.telefoneCelular"
        @input="updateTelefoneCelular"
        :disabled="disabled"
        @blur="validateCelular"
      />
    </v-col>
  </v-row>
</template>
<script>
import {
  minLengthNumbersWithMask,
  required,
  cellphoneNumberValid,
} from '@/validations/CommonValidations';
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
      telefoneResidencial: [minLengthNumbersWithMask(10)],
      telefoneCelular: [required, minLengthNumbersWithMask(11)],
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
    requiredIfInstitucionalizado(value) {
      const { tipoClassificacaoPessoa, institucionalizado } = this.suspeito;
      if (tipoClassificacaoPessoa === 'EM_SITUACAO_RUA'
        || tipoClassificacaoPessoa === 'PRIVADO_LIBERDADE'
        || institucionalizado) {
        return true;
      }
      return required(value, 'Celular é obrigatório, exceto presidiário, institucionalizado e em situação de rua.');
    },
    validateCelular() {
      this.$refs.celular.validate();
    },
  },
  created() {
    this.rules.telefoneCelular.push(
      this.requiredIfInstitucionalizado,
      cellphoneNumberValid,
    );
  },
};
</script>
