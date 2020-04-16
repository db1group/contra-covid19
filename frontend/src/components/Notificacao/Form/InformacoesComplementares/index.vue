<template>
  <div class="px-2">
    <h4 class="primary--text title">
      4. INFORMAÇÕES COMPLEMENTARES
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
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <label class="primary--text body-1 font-weight-bold">
            Histórico de viagem?
          </label>
          <v-checkbox
            :input-value="informacoesComplementares.historicoDeViagem"
            label="Sim"
            hide-details
            @change="updateHistoricoDeViagem"
          />
          <v-text-field
            :value="informacoesComplementares.dataDaViagem"
            class="pl-8"
            label="Data da viagem *"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataDaViagem"
            validate-on-blur
            :disabled="!informacoesComplementares.historicoDeViagem"
            @input="updateDataDaViagem"
          />
          <v-text-field
            :value="informacoesComplementares.localDaViagem"
            class="pl-8"
            label="Local da viagem *"
            append-icon="mdi-map-marker"
            :rules="rules.localDaViagem"
            :disabled="!informacoesComplementares.historicoDeViagem"
            @input="updateLocalDaViagem"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Recebeu vacina contra Gripe nos últimos doze meses?
          </label>
          <v-checkbox
            :input-value="informacoesComplementares.recebeuVacinaDaGripeNosUltimosDozeMeses"
            label="Sim"
            hide-details
            @change="updateRecebeuVacinaDaGripeNosUltimosDozeMeses"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import { required, dateFormat } from '@/validations/CommonValidations';
import InformacoesComplementares from '@/entities/InformacoesComplementares';

export default {
  directives: { mask },
  props: {
    informacoesComplementares: {
      type: InformacoesComplementares,
      required: true,
    },
  },
  data: () => ({
    rules: {
      dataDaViagem: [],
      localDaViagem: [],
    },
  }),
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
    updateHistoricoDeViagem(historicoDeViagem) {
      this.$emit('update:historicoDeViagem', historicoDeViagem);
    },
    updateRecebeuVacinaDaGripeNosUltimosDozeMeses(recebeuVacinaDaGripeNosUltimosDozeMeses) {
      this.$emit('update:recebeuVacinaDaGripeNosUltimosDozeMeses', recebeuVacinaDaGripeNosUltimosDozeMeses);
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
  },
  created() {
    this.rules.dataDaViagem.push(this.requiredIfHistoricoDeViagem);
    this.rules.dataDaViagem.push(this.formatDateIfHistoricoDeViagem);
    this.rules.localDaViagem.push(this.requiredIfHistoricoDeViagem);
  },
};
</script>
