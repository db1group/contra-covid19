<template>
  <div class="px-2">
    <h4 class="primary--text title">
      9. HISTÓRICO DE VIAGEM
    </h4>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <v-checkbox
            :input-value="informacoesComplementares.historicoDeViagem"
            label="Sim"
            hide-details
            @change="updateHistoricoDeViagem"
            :disabled="disabled"
          />
          <v-text-field
            :value="informacoesComplementares.dataDaViagem"
            class="pl-8"
            label="Data da viagem *"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataDaViagem"
            validate-on-blur
            :disabled="disableFields"
            @input="updateDataDaViagem"
          />
          <v-text-field
            :value="informacoesComplementares.localDaViagem"
            class="pl-8"
            label="Local da viagem *"
            append-icon="mdi-map-marker"
            :rules="rules.localDaViagem"
            :disabled="disableFields"
            @input="updateLocalDaViagem"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import { required, dateFormat, dateMustBeLesserEqualsThanToday } from '@/validations/CommonValidations';
import InformacoesComplementares from '@/entities/InformacoesComplementares';

export default {
  directives: { mask },
  props: {
    informacoesComplementares: {
      type: InformacoesComplementares,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    rules: {
      dataDaViagem: [dateMustBeLesserEqualsThanToday],
      localDaViagem: [],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.informacoesComplementares.historicoDeViagem;
    },
  },
  methods: {
    updateHistoricoDeViagem(historicoDeViagem) {
      this.$emit('update:historicoDeViagem', historicoDeViagem);
      if (!historicoDeViagem) {
        this.updateLocalDaViagem('');
        this.updateDataDaViagem('');
      }
    },
    updateDataDaViagem(dataDaViagem) {
      this.$emit('update:dataDaViagem', dataDaViagem);
    },
    updateLocalDaViagem(localDaViagem) {
      this.$emit('update:localDaViagem', localDaViagem);
    },
    requiredIfHistoricoDeViagem(value) {
      if (!this.informacoesComplementares.historicoDeViagem) {
        return true;
      }
      return required(value, 'O campo é obrigatório quando há histórico de viagem.');
    },
    formatDateIfHistoricoDeViagem(value) {
      if (!this.informacoesComplementares.historicoDeViagem) {
        return true;
      }
      return dateFormat(value);
    },
  },
  created() {
    this.rules.dataDaViagem.push(this.requiredIfHistoricoDeViagem);
    this.rules.dataDaViagem.push(this.formatDateIfHistoricoDeViagem);
    this.rules.localDaViagem.push(this.requiredIfHistoricoDeViagem);
  },
};
</script>
