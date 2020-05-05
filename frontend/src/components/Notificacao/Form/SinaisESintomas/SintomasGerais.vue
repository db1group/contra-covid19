<template>
  <div class="mt-2">
    <v-row no-gutters>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">Sintomas</label>
        <v-checkbox
          :input-value="sintomatico"
          label="Sintomático"
          hide-details
          :disabled="disabled"
          @change="updateSintomatico"
        />
      </v-col>
      <v-col
        class="pl-8"
        cols="12"
        sm="8"
        md="7"
      >
        <v-text-field
          :value="dataInicioDosSintomas"
          label="Data de início dos sintomas *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          :disabled="disableFields"
          :rules="rules.dataInicioDosSintomas"
          validate-on-blur
          @input="updateDataInicioDosSintomas"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import { required, dateFormat } from '@/validations/CommonValidations';

export default {
  directives: { mask },
  props: {
    sintomatico: {
      type: Boolean,
      required: true,
    },
    dataInicioDosSintomas: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.sintomatico;
    },
  },
  data: () => ({
    rules: {
      dataInicioDosSintomas: [],
    },
  }),
  methods: {
    updateSintomatico(sintomatico) {
      this.$emit('update:sintomatico', sintomatico);
      if (!sintomatico) {
        this.updateDataInicioDosSintomas('');
      }
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.$emit('update:dataInicioDosSintomas', dataInicioDosSintomas);
    },
    requiredIfSintomatico(value) {
      if (!this.sintomatico) {
        return true;
      }
      return required(value, 'O campo é obrigatório para casos sintomáticos');
    },
    dateFormatIfSintomatico(value) {
      if (!this.sintomatico) {
        return true;
      }
      return dateFormat(value);
    },
  },
  created() {
    this.rules.dataInicioDosSintomas.push(this.requiredIfSintomatico);
    this.rules.dataInicioDosSintomas.push(this.dateFormatIfSintomatico);
  },
};
</script>
