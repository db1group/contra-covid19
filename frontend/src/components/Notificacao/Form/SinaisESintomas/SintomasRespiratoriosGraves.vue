<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">
          Sintomas respiratórios GRAVES
        </label>
        <v-checkbox
          :value="sintomas.tosseProdutiva"
          label="TOSSE PRODUTIVA"
          hide-details
          @change="updateTosseProdutiva"
        />
        <v-checkbox
          :value="sintomas.sibilo"
          label="SIBILO / Chiado no peito"
          hide-details
          @change="updateSibilo"
        />
        <v-checkbox
          :value="sintomas.desconfortoRespiratorio"
          label="DESCONFORTO RESPIRATÓRIO / Dificuldade para respirar / Falta de ar"
          hide-details
          @change="updateDesconfortoRespiratorio"
        />
        <v-checkbox
          :value="sintomas.dispneia"
          label="DISPNEIA com batimento das asas nasais E/OU retração intercostal E/OU fúrcula external"
          hide-details
          @change="updateDispneia"
        />
        <v-checkbox
          :value="sintomas.taquipneia"
          label="TAQUIPNEIA (>30 IPM)"
          hide-details
          @change="updateTaquipneia"
        />
        <v-checkbox
          :value="sintomas.saturacaoDeOximetriaDePulso"
          label="SATURAÇÃO DE OXIMETRIA DE PULSO < 95% EM AR AMBIENTE"
          hide-details
          @change="updateSaturacaoDeOximetriaDePulso"
        />
        <v-checkbox
          :value="sintomas.cianoseCentral"
          label="CIANOSE CENTRAL"
          hide-details
          @change="updateCianoseCentral"
        />
        <v-checkbox
          :value="sintomas.diminuicaoDePulsoPeriferico"
          label="DIMINUIÇÃO DE PULSO PERIFÉRICO"
          hide-details
          @change="updateDiminuicaoDePulsoPeriferico"
        />
        <v-checkbox
          :value="sintomas.hipotensao"
          label="SINAIS DE HIPOTENSÃO (PAS < 90mmHg e/ou PAD < 60mmHg)"
          hide-details
          @change="updateHipotensao"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Sintomas from '@/entities/Sintomas';

export default {
  props: {
    sintomas: {
      type: Sintomas,
      required: true,
    },
  },
  methods: {
    updateTosseProdutiva(tosseProdutiva) {
      this.$emit('update:tosseProdutiva', tosseProdutiva);
    },
    updateSibilo(sibilo) {
      this.$emit('update:sibilo', sibilo);
    },
    updateDesconfortoRespiratorio(desconfortoRespiratorio) {
      this.$emit('update:desconfortoRespiratorio', desconfortoRespiratorio);
    },
    updateDispneia(dispneia) {
      this.$emit('update:dispneia', dispneia);
    },
    updateTaquipneia(taquipneia) {
      this.$emit('update:taquipneia', taquipneia);
    },
    updateSaturacaoDeOximetriaDePulso(saturacaoDeOximetriaDePulso) {
      this.$emit('update:saturacaoDeOximetriaDePulso', saturacaoDeOximetriaDePulso);
    },
    updateCianoseCentral(cianoseCentral) {
      this.$emit('update:cianoseCentral', cianoseCentral);
    },
    updateDiminuicaoDePulsoPeriferico(diminuicaoDePulsoPeriferico) {
      this.$emit('update:diminuicaoDePulsoPeriferico', diminuicaoDePulsoPeriferico);
    },
    updateHipotensao(hipotensao) {
      this.$emit('update:hipotensao', hipotensao);
    },
  },
};
</script>
