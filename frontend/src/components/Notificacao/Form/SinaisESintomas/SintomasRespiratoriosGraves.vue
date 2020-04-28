<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">
          Sintomas respiratórios GRAVES
        </label>
        <v-checkbox
          :input-value="sintomas.tosseProdutiva"
          label="TOSSE PRODUTIVA"
          hide-details
          :disabled="disableFields"
          @change="updateTosseProdutiva"
        />
        <v-checkbox
          :input-value="sintomas.sibilo"
          label="SIBILO / Chiado no peito"
          hide-details
          :disabled="disableFields"
          @change="updateSibilo"
        />
        <v-checkbox
          :input-value="sintomas.desconfortoRespiratorio"
          label="DESCONFORTO RESPIRATÓRIO / Dificuldade para respirar / Falta de ar"
          hide-details
          :disabled="disableFields"
          @change="updateDesconfortoRespiratorio"
        />
        <v-checkbox
          :input-value="sintomas.dispneia"
          label="DISPNEIA com batimento das asas nasais E/OU retração intercostal E/OU fúrcula external"
          hide-details
          :disabled="disableFields"
          @change="updateDispneia"
        />
        <v-checkbox
          :input-value="sintomas.taquipneia"
          label="TAQUIPNEIA (>30 IPM)"
          hide-details
          :disabled="disableFields"
          @change="updateTaquipneia"
        />
        <v-checkbox
          :input-value="sintomas.saturacaoDeOximetriaDePulso"
          label="SATURAÇÃO DE OXIMETRIA DE PULSO < 95% EM AR AMBIENTE"
          hide-details
          :disabled="disableFields"
          @change="updateSaturacaoDeOximetriaDePulso"
        />
        <v-checkbox
          :input-value="sintomas.cianoseCentral"
          label="CIANOSE CENTRAL"
          hide-details
          :disabled="disableFields"
          @change="updateCianoseCentral"
        />
        <v-checkbox
          :input-value="sintomas.diminuicaoDePulsoPeriferico"
          label="DIMINUIÇÃO DE PULSO PERIFÉRICO"
          hide-details
          :disabled="disableFields"
          @change="updateDiminuicaoDePulsoPeriferico"
        />
        <v-checkbox
          :input-value="sintomas.hipotensao"
          label="SINAIS DE HIPOTENSÃO (PAS < 90mmHg e/ou PAD < 60mmHg)"
          hide-details
          :disabled="disableFields"
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
    sintomatico: {
      type: Boolean,
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
