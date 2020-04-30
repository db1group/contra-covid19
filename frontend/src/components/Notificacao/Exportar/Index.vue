<template>
  <div class="px-2 col-12">
    <v-row dense>
      <v-col cols="4">
        <v-text-field
          :value="exportar.dataInicial"
          label="Data inicial *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          validate-on-blur
          :rules="rules.dataInicial"
          @input="updateDataInicial"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          :value="exportar.dataFinal"
          label="Data final *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          validate-on-blur
          :rules="rules.dataFinal"
          @input="updateDataFinal"
        />
      </v-col>
      <v-spacer />
      <v-col cols="3">
        <v-btn
        color="primary"
        rounded :to="{ name: 'exportar' }"
        @click="onClick">
          <v-icon>mdi-download</v-icon>exportar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import NotificacaoExportar from '@/entities/NotificacaoExportar';
import { required } from '@/validations/CommonValidations';
import DateService from '@/services/DateService';

export default {
  directives: { mask },
  props: {
    exportar: NotificacaoExportar,
  },
  data: () => ({
    rules: {
      dataInicial: [required],
      dataFinal: [required],
    },
  }),
  methods: {
    updateDataInicial(dataInicial) {
      this.$emit('update:dataInicial', this.formatDate(dataInicial));
    },
    updateDataFinal(dataFinal) {
      this.$emit('update:dataFinal', this.formatDate(dataFinal));
    },
    onClick() {
      this.$emit('click');
    },
    formatDate(date) {
      return DateService.formatDateTypeToString(date);
    },
  },
};
</script>
