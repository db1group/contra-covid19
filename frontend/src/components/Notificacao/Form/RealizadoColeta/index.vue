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
            :value="conclusaoAtendimento.tipoLaboratorio"
            class="pl-8"
            :disabled="!realizadaColeta"
            @change="changeTipoLaboratorio"
          >
            <v-radio value="OFICIAL" label="Laboratório Oficial"/>
            <v-radio value="PRIVADO" label="Laboratório da rede PRIVADA"/>
          </v-radio-group>
          <v-text-field
            :value="conclusaoAtendimento.nomeLaboratorioEnvioMaterial"
            label="Nome do laboratório"
            :disabled="conclusaoAtendimento.tipoLaboratorio!=='PRIVADO'"
            class="realizado-coleta__nome-laboratorio"
            @input="updateNomeLaboratorioEnvioMaterial"
          />

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
<style lang="sass" scoped>
.realizado-coleta
  &__nome-laboratorio
    padding-left: 64px
</style>
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
        this.updateNomeLaboratorioEnvioMaterial('');
      }
    },
    changeTipoLaboratorio(tipoLaboratorio) {
      this.$emit('update:tipoLaboratorio', tipoLaboratorio);

      if (tipoLaboratorio !== 'PRIVADO') {
        console.log('Entrou');
        this.updateNomeLaboratorioEnvioMaterial('');
      }
    },
    unselectTipoLaboratorio() {
      this.tipoLaboratorio = null;
      this.$emit('update:tipoLaboratorio', null);
    },
    updateDataDaColeta(dataDaColeta) {
      this.$emit('update:dataDaColeta', dataDaColeta);
    },
    updateMetodoDeExame(metodoDeExame) {
      this.$emit('update:metodoDeExame', metodoDeExame);
    },
    updateNomeLaboratorioEnvioMaterial(nomeLaboratorioEnvioMaterial) {
      this.$emit('update:nomeLaboratorioEnvioMaterial', nomeLaboratorioEnvioMaterial);
    },
  },
};
</script>
