<template>
  <div class="px-2">
    <h4 class="primary--text title">
      10. CONTATO COM SUSPEITO OU CONFIRMADO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row dense>
        <v-col cols="12">
          <v-select
            :value="notificacao.tipoDeContatoComCaso"
            :rules="rules.tipoDeContatoComCaso"
            label="Tipo de contato *"
            :items="tiposDeContato"
            item-text="value"
            item-value="key"
            @input="updateTipoDeContato"
          />
          <v-col cols="12">
            <v-radio-group
              :value="notificacao.tipoDeLocalDoCaso"
              label="Local do contato"
              @change="updateTipoDeLocalDoCaso"
            >
              <v-radio
                v-for="localContato in locaisContato"
                :key="localContato.value"
                :value="localContato.value"
                :label="localContato.label"
                :disabled="notificacao.tipoDeContatoComCaso === 'SEM_CONTATO' || !notificacao.tipoDeContatoComCaso"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :value="notificacao.nomeDoCaso"
              label="Nome da pessoa suspeita"
              :disabled="notificacao.tipoDeContatoComCaso === 'SEM_CONTATO' || !notificacao.tipoDeContatoComCaso"
              @input="updateNomeDoCaso"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { required } from '@/validations/CommonValidations';
import locaisContato from '@/entities/enums/LocaisContato.json';
import Notificacao from '@/entities/Notificacao';

const TIPOS_DE_CONTATO = [
  { key: 'SUSPEITO', value: 'Contato com suspeito' },
  { key: 'CONFIRMADO', value: 'Contato com caso confirmado laboratorialmente para SARS-CoV2' },
  { key: 'SEM_CONTATO', value: 'Sem contato' },
];

export default {
  },
  props: {
    notificacao: {
      type: Notificacao,
      required: true,
    },
  },
  data: () => ({
    locaisContato,
    tiposDeContato: TIPOS_DE_CONTATO,
    rules: {
      tipoDeContatoComCaso: [required],
    },
  }),
  methods: {
    updateTipoDeContato(tipoDeContatoComCaso) {
      this.$emit('update:tipoDeContatoComCaso', tipoDeContatoComCaso);
      this.updateTipoDeLocalDoCaso(null);
      this.updateNomeDoCaso(null);
    },
    updateTipoDeLocalDoCaso(tipoDeLocalDoCaso) {
      this.$emit('update:tipoDeLocalDoCaso', tipoDeLocalDoCaso);
    },
    updateNomeDoCaso(nomeDoCaso) {
      this.$emit('update:nomeDoCaso', nomeDoCaso);
    },
  },
};
</script>
