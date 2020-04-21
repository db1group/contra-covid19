<template>
  <div class="px-2">
    <h4 class="primary--text title">
      11. OUTRAS INFORMAÇÕES
    </h4>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Recebeu vacina contra Gripe nos últimos doze meses? *
          </label>
          <v-radio-group
            :input-value="informacoesComplementares.recebeuVacinaDaGripeNosUltimosDozeMeses"
            row
            :rules="rules.recebeuVacinaDaGripeNosUltimosDozeMeses"
            @change="updateRecebeuVacinaDaGripeNosUltimosDozeMeses"
          >
            <v-radio value="NAO" label="Não"/>
            <v-radio value="SIM" label="Sim"/>
            <v-radio value="NAO_SABE" label="Não Sabe"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { required } from '@/validations/CommonValidations';
import InformacoesComplementares from '@/entities/InformacoesComplementares';

export default {
  props: {
    informacoesComplementares: {
      type: InformacoesComplementares,
      required: true,
    },
  },
  data: () => ({
    rules: {
      recebeuVacinaDaGripeNosUltimosDozeMeses: [required],
    },
  }),
  methods: {
    updateRecebeuVacinaDaGripeNosUltimosDozeMeses(recebeuVacinaDaGripeNosUltimosDozeMeses) {
      this.$emit('update:recebeuVacinaDaGripeNosUltimosDozeMeses', recebeuVacinaDaGripeNosUltimosDozeMeses);
    },
  },
};
</script>
