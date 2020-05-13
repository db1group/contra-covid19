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
            :input-value="conclusaoAtendimento.coletaMaterialParaDiagnostico"
            label="Sim"
            hide-details
            @change="updateRealizadaColeta"
            :disabled="disabled"
          />
          <v-text-field
            :value="conclusaoAtendimento.dataDaColeta"
            class="pl-8"
            label="Data da Coleta *"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :disabled="disableFields"
            :rules="rules.dataDaColeta"
            ref="dataDaColeta"
            @input="updateDataDaColeta"
          />
          <v-radio-group
            :value="conclusaoAtendimento.tipoLaboratorio"
            :rules="rules.tipoLaboratorio"
            ref="tipoLaboratorio"
            class="pl-8"
            @change="changeTipoLaboratorio"
            :disabled="disableFields"
          >
            <v-radio value="OFICIAL" label="Laboratório Oficial"/>
            <v-radio value="PRIVADO" label="Laboratório da rede PRIVADA"/>
          </v-radio-group>
          <v-text-field
            :value="conclusaoAtendimento.nomeLaboratorioEnvioMaterial"
            label="Nome do laboratório"
            :disabled="disableNomeLab"
            class="realizado-coleta__nome-laboratorio"
            @input="updateNomeLaboratorioEnvioMaterial"
          />

          <v-radio-group
            :value="conclusaoAtendimento.metodoDeExame"
            :rules="rules.metodoDeExame"
            ref="metodoDeExame"
            class="pl-8"
            label="Método do exame"
            :disabled="disableFields"
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
import { required, dateFormat, dateMustBeLesserEqualsThanToday } from '@/validations/CommonValidations';
import ConclusaoAtendimento from '@/entities/ConclusaoAtendimento';

export default {
  directives: { mask },
  props: {
    conclusaoAtendimento: {
      type: ConclusaoAtendimento,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    rules: {
      dataDaColeta: [],
      tipoLaboratorio: [],
      metodoDeExame: [],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.conclusaoAtendimento.coletaMaterialParaDiagnostico;
    },
    disableNomeLab() {
      if (this.disabled) return true;
      return this.conclusaoAtendimento.tipoLaboratorio !== 'PRIVADO';
    },
  },
  methods: {
    updateRealizadaColeta(coletaMaterialParaDiagnostico) {
      this.$emit('update:coletaMaterialParaDiagnostico', coletaMaterialParaDiagnostico);
      if (!coletaMaterialParaDiagnostico) {
        this.unselectTipoLaboratorio();
        this.updateDataDaColeta('');
        this.updateMetodoDeExame(null);
        this.updateNomeLaboratorioEnvioMaterial('');
        this.removeRequiredInFields();
        return;
      }
      this.addRequiredInFields();
    },
    changeTipoLaboratorio(tipoLaboratorio) {
      this.$emit('update:tipoLaboratorio', tipoLaboratorio);

      if (tipoLaboratorio !== 'PRIVADO') {
        this.updateNomeLaboratorioEnvioMaterial('');
      }
    },
    unselectTipoLaboratorio() {
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
    validate() {
      this.$refs.dataDaColeta.validate();
      this.$refs.tipoLaboratorio.validate();
      this.$refs.metodoDeExame.validate();
    },
    removeRequiredInFields() {
      this.rules.dataDaColeta = [];
      this.rules.tipoLaboratorio = [];
      this.rules.metodoDeExame = [];
      this.validate();
    },
    addRequiredInFields() {
      this.rules.dataDaColeta.push(required, dateFormat, dateMustBeLesserEqualsThanToday);
      this.rules.tipoLaboratorio.push(required);
      this.rules.metodoDeExame.push(required);
      this.validate();
    },
  },
};
</script>
