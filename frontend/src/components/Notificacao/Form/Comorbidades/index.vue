<template>
  <div class="px-2">
    <h4 class="primary--text title">
      6. COMORBIDADES PRÉVIAS / FATORES DE RISCO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.puerperaAte45DiasDoParto"
            label="Puérpera até 45 dias do parto"
            hide-details
            @change="updatePuerperaAte45DiasDoParto"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaNeurologicaCronica"
            label="Doença neurológica crônica"
            hide-details
            @change="updateDoencaNeurologicaCronica"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.sindromeDeDown"
            label="Síndrome de Down"
            hide-details
            @change="updateSindromeDeDown"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaRenalCronica"
            label="Doença renal crônica"
            hide-details
            @change="updateDoencaRenalCronica"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.diabetesMellitus"
            label="Diabetes Mellitus"
            hide-details
            @change="updateDiabetesMellitus"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaHematologicaCronica"
            label="Doença hematológica crônica"
            hide-details
            @change="updateDoencaHematologicaCronica"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.imunodeficiencia"
            label="Imunodeficiência/imunodepressão"
            hide-details
            @change="updateImunodeficiencia"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.asma"
            label="Asma"
            hide-details
            @change="updateAsma"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaCardioVascularCronica"
            label="Doença cardiovascular crônica"
            hide-details
            @change="updateDoencaCardioVascularCronica"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.outraPneumopatiaCronica"
            label="Outra pneumopatia crônica"
            hide-details
            @change="updateOutraPneumopatiaCronica"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaHepaticaCronica"
            label="Doença hepática crônica"
            hide-details
            @change="updateDoencaHepaticaCronica"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.obesidade"
            label="Obesidade"
            hide-details
            @change="updateObesidade"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.hipertensao"
            label="Hipertensão"
            hide-details
            @change="updateHipertensao"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.infeccaoHIV"
            label="Infecção HIV"
            hide-details
            @change="updateInfeccaoHIV"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.neoplasia"
            label="Neoplasia"
            hide-details
            @change="updateNeoplasia"
            :disabled="disabled"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.tabagismo"
            label="Tabagismo"
            hide-details
            @change="updateTabagismo"
            :disabled="disabled"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-checkbox
            :input-value="comorbidades.outrasComorbidades"
            label="Outros"
            hide-details
            @change="updateOutrasComorbidades"
            :disabled="disabled"
          />
          <v-text-field
            :value="comorbidades.outros"
            class="pl-8"
            label="Especifique"
            :disabled="disableOutro"
            @input="updateOutros"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Comorbidades from '@/entities/Comorbidades';

export default {
  props: {
    comorbidades: {
      type: Comorbidades,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  computed: {
    disableOutro() {
      if (this.disabled) return true;
      return !this.comorbidades.outrasComorbidades;
    },
  },
  methods: {
    updatePuerperaAte45DiasDoParto(puerperaAte45DiasDoParto) {
      this.$emit('update:puerperaAte45DiasDoParto', puerperaAte45DiasDoParto);
    },
    updateDoencaNeurologicaCronica(doencaNeurologicaCronica) {
      this.$emit('update:doencaNeurologicaCronica', doencaNeurologicaCronica);
    },
    updateSindromeDeDown(sindromeDeDown) {
      this.$emit('update:sindromeDeDown', sindromeDeDown);
    },
    updateDoencaRenalCronica(doencaRenalCronica) {
      this.$emit('update:doencaRenalCronica', doencaRenalCronica);
    },
    updateDiabetesMellitus(diabetesMellitus) {
      this.$emit('update:diabetesMellitus', diabetesMellitus);
    },
    updateDoencaHematologicaCronica(doencaHematologicaCronica) {
      this.$emit('update:doencaHematologicaCronica', doencaHematologicaCronica);
    },
    updateImunodeficiencia(imunodeficiencia) {
      this.$emit('update:imunodeficiencia', imunodeficiencia);
    },
    updateAsma(asma) {
      this.$emit('update:asma', asma);
    },
    updateDoencaCardioVascularCronica(doencaCardioVascularCronica) {
      this.$emit('update:doencaCardioVascularCronica', doencaCardioVascularCronica);
    },
    updateOutraPneumopatiaCronica(outraPneumopatiaCronica) {
      this.$emit('update:outraPneumopatiaCronica', outraPneumopatiaCronica);
    },
    updateDoencaHepaticaCronica(doencaHepaticaCronica) {
      this.$emit('update:doencaHepaticaCronica', doencaHepaticaCronica);
    },
    updateObesidade(obesidade) {
      this.$emit('update:obesidade', obesidade);
    },
    updateOutros(outros) {
      this.$emit('update:outros', outros);
    },
    updateHipertensao(hipertensao) {
      this.$emit('update:hipertensao', hipertensao);
    },
    updateInfeccaoHIV(infeccaoHIV) {
      this.$emit('update:infeccaoHIV', infeccaoHIV);
    },
    updateNeoplasia(neoplasia) {
      this.$emit('update:neoplasia', neoplasia);
    },
    updateTabagismo(tabagismo) {
      this.$emit('update:tabagismo', tabagismo);
    },
    updateOutrasComorbidades(outrasComorbidades) {
      this.comorbidades.outrasComorbidades = outrasComorbidades;
      if (!this.comorbidades.outrasComorbidades) {
        this.updateOutros('');
      }
    },
  },
};
</script>
