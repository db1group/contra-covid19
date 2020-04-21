<template>
  <div class="px-2">
    <h4 class="primary--text title">
      7. OUTRAS INFORMAÇÕES
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Uso de medicação antitérmica?
          </label>
          <v-checkbox
            :input-value="informacoesComplementares.medicacaoAntitermica"
            label="Sim"
            hide-details
            @change="updateMedicacaoAntitermica"
          />
          <v-text-field
            :value="informacoesComplementares.nomeMedicacaoAntitermica"
            class="pl-8"
            label="Especifique"
            :disabled="!informacoesComplementares.medicacaoAntitermica"
            @input="updateNomeMedicacaoAntitermica"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Uso de analgésico?
          </label>
          <v-checkbox
            :input-value="informacoesComplementares.medicacaoAnalgesica"
            label="Sim"
            hide-details
            @change="updateMedicacaoAnalgesica"
          />
          <v-text-field
            :value="informacoesComplementares.nomeMedicacaoAnalgesica"
            class="pl-8"
            label="Especifique"
            :disabled="!informacoesComplementares.medicacaoAnalgesica"
            @input="updateNomeMedicacaoAnalgesica"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Uso de anti-inflamatório?
          </label>
          <v-checkbox
            :input-value="informacoesComplementares.medicacaoAntiflamatorio"
            label="Sim"
            hide-details
            @change="updateMedicacaoAntiflamatorio"
          />
          <v-text-field
            :value="informacoesComplementares.nomeMedicacaoAntiflamatorio"
            class="pl-8"
            label="Especifique"
            :disabled="!informacoesComplementares.medicacaoAntiflamatorio"
            @input="updateNomeMedicacaoAntiflamatorio"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Uso de medicação Antiviral?
          </label>
          <v-checkbox
            :input-value="informacoesComplementares.medicacaoAntiviral"
            label="Sim"
            hide-details
            @change="updateMedicacaoAntiviral"
          />
          <v-text-field
            :value="informacoesComplementares.nomeMedicacaoAntiviral"
            class="pl-8"
            label="Especifique"
            :disabled="!informacoesComplementares.medicacaoAntiviral"
            @input="updateNomeMedicacaoAntiviral"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import InformacoesComplementares from '@/entities/InformacoesComplementares';

export default {
  props: {
    informacoesComplementares: {
      type: InformacoesComplementares,
      required: true,
    },
  },
  methods: {
    updateMedicacaoAntitermica(medicacaoAntitermica) {
      this.$emit('update:medicacaoAntitermica', medicacaoAntitermica);
    },
    updateMedicacaoAnalgesica(medicacaoAnalgesica) {
      this.$emit('update:medicacaoAnalgesica', medicacaoAnalgesica);
    },
    updateMedicacaoAntiflamatorio(medicacaoAntiflamatorio) {
      this.$emit('update:medicacaoAntiflamatorio', medicacaoAntiflamatorio);
    },
    updateMedicacaoAntiviral(medicacaoAntiviral) {
      this.$emit('update:medicacaoAntiviral', medicacaoAntiviral);
    },
    updateNomeMedicacaoAntitermica(nomeMedicacaoAntitermica) {
      this.$emit('update:nomeMedicacaoAntitermica', nomeMedicacaoAntitermica);
    },
    updateNomeMedicacaoAnalgesica(nomeMedicacaoAnalgesica) {
      this.$emit('update:nomeMedicacaoAnalgesica', nomeMedicacaoAnalgesica);
    },
    updateNomeMedicacaoAntiflamatorio(nomeMedicacaoAntiflamatorio) {
      this.$emit('update:nomeMedicacaoAntiflamatorio', nomeMedicacaoAntiflamatorio);
    },
    updateNomeMedicacaoAntiviral(nomeMedicacaoAntiviral) {
      this.$emit('update:nomeMedicacaoAntiviral', nomeMedicacaoAntiviral);
    },
  },
};
</script>
