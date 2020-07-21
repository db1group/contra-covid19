<template>
  <div class="px-2">
    <h4 class="primary--text title">10. HISTÓRICO DE VIAGEM</h4>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <v-checkbox
            :input-value="informacoesComplementares.historicoDeViagem"
            label="Sim"
            hide-details
            @change="updateHistoricoDeViagem"
            :disabled="disabled"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6">
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
        </v-col>
        <v-col cols="12" sm="6" md="6">
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
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="informacoesComplementares.dataRetornoLocal"
            class="pl-8"
            label="Data de Retorno"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataRetornoLocal"
            validate-on-blur
            :disabled="disableFields"
            @input="updateDataRetorno"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="informacoesComplementares.dataChegadaBrasil"
            class="pl-8"
            label="Data Chegada no Brasil"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataChegadaBrasil"
            validate-on-blur
            :disabled="disableFields"
            @input="updateDataChegadaBrasil"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="informacoesComplementares.dataChegadaUF"
            class="pl-8"
            label="Data Chegada no Estado"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataChegadaUF"
            validate-on-blur
            :disabled="disableFields"
            @input="updateDataChegadaUF"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :value="informacoesComplementares.descritivoViagem"
            label="Descritivo da viagem"
            :rules="rules.descritivoViagem"
            :disabled="disableFields"
            @input="updateDescritivoViagem"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import {
  required,
  dateFormat,
  dateMustBeLesserEqualsThanToday,
  maxLength,
} from '@/validations/CommonValidations';
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
      localDaViagem: [maxLength(255)],
      dataRetornoLocal: [dateMustBeLesserEqualsThanToday],
      dataChegadaBrasil: [dateMustBeLesserEqualsThanToday],
      dataChegadaUF: [dateMustBeLesserEqualsThanToday],
      descritivoViagem: [maxLength(255)],
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
        this.updateDataRetorno('');
        this.updateDataChegadaBrasil('');
        this.updateDataChegadaUF('');
        this.updateDescritivoViagem('');
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
    updateDataRetorno(dataRetornoLocal) {
      this.$emit('update:dataRetornoLocal', dataRetornoLocal);
    },
    updateDataChegadaBrasil(dataChegadaBrasil) {
      this.$emit('update:dataChegadaBrasil', dataChegadaBrasil);
    },
    updateDataChegadaUF(dataChegadaUF) {
      this.$emit('update:dataChegadaUF', dataChegadaUF);
    },
    updateDescritivoViagem(descritivoViagem) {
      this.$emit('update:descritivoViagem', descritivoViagem);
    },
  },
  created() {
    this.rules.dataDaViagem.push(this.requiredIfHistoricoDeViagem);
    this.rules.dataDaViagem.push(this.formatDateIfHistoricoDeViagem);
    this.rules.localDaViagem.push(this.requiredIfHistoricoDeViagem);
    this.rules.dataRetornoLocal.push(this.formatDateIfHistoricoDeViagem);
    this.rules.dataChegadaBrasil.push(this.formatDateIfHistoricoDeViagem);
    this.rules.dataChegadaUF.push(this.formatDateIfHistoricoDeViagem);
  },
};
</script>
