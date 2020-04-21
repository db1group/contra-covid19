<template>
  <div class="px-2">
    <h4 class="primary--text title">
      8. REALIZADO COLETA DE MATERIAL PARA DIAGNÓSTICO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12">
          <v-checkbox
            :input-value="realizadaColeta"
            label="Sim"
            hide-details
            @change="updateRealizadaColeta"
          />
          <v-text-field
            :value="conclusaoAtendimento.dataDaColeta"
            class="pl-8"
            label="Data da Coleta"
            v-mask="'##/##/####'"
            :disabled="!realizadaColeta"
            :rules="rules.dataDaColeta"
            @input="updateDataDaColeta"
          />
          <v-radio-group
            :value="tipoLaboratorio"
            class="pl-8"
            :disabled="!realizadaColeta"
            @change="changeTipoLaboratorio"
          >
            <v-radio :value="1" label="Laboratório Oficial/LACEN"/>
            <v-radio :value="2" label="Laboratório da rede PRIVADA"/>
          </v-radio-group>
          <v-radio-group
            :value="conclusaoAtendimento.metodoDeExame"
            class="pl-8"
            label="Método do exame"
            :disabled="!realizadaColeta"
            @change="updateMetodoDeExame"
          >
            <v-radio value="RT-PCR" label="RT-PCR"/>
            <v-radio value="TESTE_RAPIDO" label="Teste rápido"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import { dateFormat } from '@/validations/CommonValidations';
import ConclusaoAtendimento from '@/entities/ConclusaoAtendimento';

export default {
  directives: { mask },
  props: {
    conclusaoAtendimento: {
      type: ConclusaoAtendimento,
      required: true,
    },
  },
  data: () => ({
    realizadaColeta: false,
    tipoLaboratorio: null,
    rules: {
      dataDaColeta: [dateFormat],
    },
  }),
  methods: {
    updateRealizadaColeta(realizadaColeta) {
      this.realizadaColeta = realizadaColeta;
      if (!this.realizadaColeta) {
        this.unselectTipoLaboratorio();
        this.updateDataDaColeta('');
        this.updateMetodoDeExame(null);
      }
    },
    changeTipoLaboratorio(tipoLaboratorio) {
      this.tipoLaboratorio = tipoLaboratorio;
      if (this.tipoLaboratorio === 1) {
        this.selectOficial();
        return;
      }
      if (this.tipoLaboratorio === 2) {
        this.selectRedePrivada();
      }
    },
    selectOficial() {
      this.$emit('update:laboratorioOficial', true);
      this.$emit('update:laboratorioRedePrivada', false);
    },
    selectRedePrivada() {
      this.$emit('update:laboratorioOficial', false);
      this.$emit('update:laboratorioRedePrivada', true);
    },
    unselectTipoLaboratorio() {
      this.tipoLaboratorio = null;
      this.$emit('update:laboratorioOficial', false);
      this.$emit('update:laboratorioRedePrivada', false);
    },
    updateDataDaColeta(dataDaColeta) {
      this.$emit('update:dataDaColeta', dataDaColeta);
    },
    updateMetodoDeExame(metodoDeExame) {
      this.$emit('update:metodoDeExame', metodoDeExame);
    },
  },
};
</script>
