<template>
  <div class="px-2">
    <h4 class="primary--text title">
      6. COMORBIDADES
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
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaNeurologicaCronica"
            label="Doença neurológica crônica"
            hide-details
            @change="updateDoencaNeurologicaCronica"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.sindromeDeDown"
            label="Síndrome de Down"
            hide-details
            @change="updateSindromeDeDown"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaRenalCronica"
            label="Doença renal crônica"
            hide-details
            @change="updateDoencaRenalCronica"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.diabetesMellitus"
            label="Diabetes Mellitus"
            hide-details
            @change="updateDiabetesMellitus"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaHematologicaCronica"
            label="Doença hematológica crônica"
            hide-details
            @change="updateDoencaHematologicaCronica"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.imunodeficiencia"
            label="Imunodeficiência/imunodepressão"
            hide-details
            @change="updateImunodeficiencia"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.asma"
            label="Asma"
            hide-details
            @change="updateAsma"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaCardioVascularCronica"
            label="Doença cardiovascular crônica"
            hide-details
            @change="updateDoencaCardioVascularCronica"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.outraPneumopatiaCronica"
            label="Outra pneumopatia crônica"
            hide-details
            @change="updateOutraPneumopatiaCronica"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.doencaHepaticaCronica"
            label="Doença hepática crônica"
            hide-details
            @change="updateDoencaHepaticaCronica"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            :input-value="comorbidades.obesidade"
            label="Obesidade"
            hide-details
            @change="updateObesidade"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-checkbox
            :input-value="outrasComorbidades"
            label="Outros"
            hide-details
            @change="updateOutrasComorbidades"
          />
          <v-text-field
            :value="comorbidades.outros"
            class="pl-8"
            label="Especifique"
            :disabled="!outrasComorbidades"
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
  },
  data: () => ({
    outrasComorbidades: false,
  }),
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
    updateOutrasComorbidades(outrasComorbidades) {
      this.outrasComorbidades = outrasComorbidades;
    },
  },
};
</script>
