<template>
  <div class="mt-2">
    <v-row no-gutters>
      <v-col cols="12">
        <v-checkbox
          :input-value="sintomatico"
          label="Sintomático"
          hide-details
          @change="updateSintomatico"
        />
      </v-col>
      <v-col class="pl-8" cols="12" sm="8" md="7">
        <v-text-field
          :value="dataInicioDosSintomas"
          label="Data de início dos sintomas *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          :disabled="!sintomatico"
          :rules="rules.dataInicioDosSintomas"
          validate-on-blur
          @input="updateDataInicioDosSintomas"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          :input-value="sintomas.cianoseCentral"
          label="CIANOSE CENTRAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateCianoseCentral"
        />
        <v-checkbox
          :input-value="sintomas.congestaoNasal"
          label="CONGESTÃO NASAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateCongestaoNasal"
        />
        <v-checkbox
          :input-value="sintomas.coriza"
          label="CORIZA"
          hide-details
          :disabled="!sintomatico"
          @change="updateCoriza"
        />
        <v-checkbox
          :input-value="sintomas.desconfortoRespiratorio"
          label="DESCONFORTO RESPIRATÓRIO / Dificuldade para respirar / Falta de ar"
          hide-details
          :disabled="!sintomatico"
          @change="updateDesconfortoRespiratorio"
        />
        <v-checkbox
          :input-value="sintomas.diminuicaoDePulsoPeriferico"
          label="DIMINUIÇÃO DE PULSO PERIFÉRICO"
          hide-details
          :disabled="!sintomatico"
          @change="updateDiminuicaoDePulsoPeriferico"
        />
        <v-checkbox
          :input-value="sintomas.dispneia"
          label="DISPNEIA com batimento das asas nasais E/OU retração intercostal E/OU fúrcula external"
          hide-details
          :disabled="!sintomatico"
          @change="updateDispneia"
        />
        <v-checkbox
          :input-value="sintomas.dorDeGarganta"
          label="DOR DE GARGANTA"
          hide-details
          :disabled="!sintomatico"
          @change="updateDorDeGarganta"
        />
        <v-checkbox
          :input-value="sintomas.mialgia"
          label="MIALGIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateMialgia"
        />
        <v-checkbox
          :input-value="sintomas.saturacaoDeOximetriaDePulso"
          label="SATURAÇÃO DE OXIMETRIA DE PULSO < 95% EM AR AMBIENTE"
          hide-details
          :disabled="!sintomatico"
          @change="updateSaturacaoDeOximetriaDePulso"
        />
        <v-checkbox
          :input-value="sintomas.sibilo"
          label="SIBILO / Chiado no peito"
          hide-details
          :disabled="!sintomatico"
          @change="updateSibilo"
        />
        <v-checkbox
          :input-value="sintomas.taquipneia"
          label="TAQUIPNEIA (>30 IPM)"
          hide-details
          :disabled="!sintomatico"
          @change="updateTaquipneia"
        />
        <v-checkbox
          :input-value="sintomas.tosseProdutiva"
          label="TOSSE PRODUTIVA"
          hide-details
          :disabled="!sintomatico"
          @change="updateTosseProdutiva"
        />
        <v-checkbox
          :input-value="sintomas.tosseSeca"
          label="TOSSE SECA"
          hide-details
          :disabled="!sintomatico"
          @change="updateTosseSeca"
        />
        <v-checkbox
          :input-value="sintomas.tiragemIntercostal"
          label="TIRAGEM INTERCOSTAL"
          hide-details
          :disabled="!sintomatico"
          @change="updateTiragemIntercostal"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import { required, dateFormat } from '@/validations/CommonValidations';
import Sintomas from '@/entities/Sintomas';

export default {
  directives: { mask },
  props: {
    sintomas: {
      type: Sintomas,
      required: true,
    },
    sintomatico: {
      type: Boolean,
      required: true,
    },
    dataInicioDosSintomas: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    existemOutrosSintomas: false,
    rules: {
      dataInicioDosSintomas: [],
    },
  }),
  methods: {
    updateSintomatico(sintomatico) {
      this.$emit('update:sintomatico', sintomatico);
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.$emit('update:dataInicioDosSintomas', dataInicioDosSintomas);
    },
    updateCianoseCentral(cianoseCentral) {
      this.$emit('update:cianoseCentral', cianoseCentral);
    },
    updateCongestaoNasal(congestaoNasal) {
      this.$emit('update:congestaoNasal', congestaoNasal);
    },
    updateCoriza(coriza) {
      this.$emit('update:coriza', coriza);
    },
    updateDesconfortoRespiratorio(desconfortoRespiratorio) {
      this.$emit('update:desconfortoRespiratorio', desconfortoRespiratorio);
    },
    updateDiminuicaoDePulsoPeriferico(diminuicaoDePulsoPeriferico) {
      this.$emit('update:diminuicaoDePulsoPeriferico', diminuicaoDePulsoPeriferico);
    },
    updateDispneia(dispneia) {
      this.$emit('update:dispneia', dispneia);
    },
    updateDorDeGarganta(dorDeGarganta) {
      this.$emit('update:dorDeGarganta', dorDeGarganta);
    },
    updateMialgia(mialgia) {
      this.$emit('update:mialgia', mialgia);
    },
    updateSaturacaoDeOximetriaDePulso(saturacaoDeOximetriaDePulso) {
      this.$emit('update:saturacaoDeOximetriaDePulso', saturacaoDeOximetriaDePulso);
    },
    updateSibilo(sibilo) {
      this.$emit('update:sibilo', sibilo);
    },
    updateTaquipneia(taquipneia) {
      this.$emit('update:taquipneia', taquipneia);
    },
    updateTosseProdutiva(tosseProdutiva) {
      this.$emit('update:tosseProdutiva', tosseProdutiva);
    },
    updateTosseSeca(tosseSeca) {
      this.$emit('update:tosseSeca', tosseSeca);
    },
    updateTiragemIntercostal(tiragemIntercostal) {
      this.$emit('update:tiragemIntercostal', tiragemIntercostal);
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
