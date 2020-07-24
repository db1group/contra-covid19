<template>
  <div class="px-2">
    <h4 class="primary--text title">12. CONTATO COM SUSPEITO OU CONFIRMADO</h4>
    <v-container fluid class="pa-0">
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
            :disabled="disabled"
          />
          <v-col cols="12">
            <v-radio-group
              :value="notificacao.tipoDeLocalDoCaso"
              label="Local do contato"
              @change="updateTipoDeLocalDoCaso"
              :disabled="disabled"
            >
              <v-radio
                v-for="localContato in locaisContato"
                :key="localContato.value"
                :value="localContato.value"
                :label="localContato.label"
                :disabled="disableNomeCaso"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :value="notificacao.nomeDoCaso"
              :rules="rules.nomeDoCaso"
              label="Nome da pessoa"
              :disabled="disableNomeCaso"
              @input="updateNomeDoCaso"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              :value="notificacao.descricaoLocal"
              :rules="rules.descricaoLocal"
              label="Descrição do local"
              :disabled="disableNomeCaso"
              @input="updateDescricaoLocal"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import {
  required, minLength, maxLength, onlyLetters,
} from '@/validations/CommonValidations';
import locaisContato from '@/entities/enums/LocaisContato.json';
import Notificacao from '@/entities/Notificacao';

const TIPOS_DE_CONTATO = [
  { key: 'SUSPEITO', value: 'Contato com suspeito' },
  { key: 'CONFIRMADO', value: 'Contato com caso confirmado laboratorialmente para SARS-CoV2' },
  { key: 'SEM_CONTATO', value: 'Sem contato' },
];

export default {
  props: {
    notificacao: {
      type: Notificacao,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    locaisContato,
    tiposDeContato: TIPOS_DE_CONTATO,
    rules: {
      tipoDeContatoComCaso: [required],
      nomeDoCaso: [onlyLetters, minLength(3), maxLength(150)],
      descricaoLocal: [maxLength(255)],
    },
  }),
  computed: {
    disableNomeCaso() {
      if (this.disabled) return true;
      return this.notificacao.tipoDeContatoComCaso === 'SEM_CONTATO'
        || !this.notificacao.tipoDeContatoComCaso;
    },
  },
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
    updateDescricaoLocal(descricaoLocal) {
      this.$emit('update:descricaoLocal', descricaoLocal);
    },
    requiredContatoSuspeitoConfirmado(value) {
      return value !== 'SEM_CONTATO' || 'Deve ser selecionado o contato suspeito ou confirmado.';
    },
    tipoContatoConfirmadoIfSituacao2(value) {
      if (!this.notificacao.vinculoEpidemiologico.situacao2) {
        return true;
      }
      return this.requiredContatoSuspeitoConfirmado(value);
    },
  },
  created() {
    this.rules.tipoDeContatoComCaso.push(this.tipoContatoConfirmadoIfSituacao2);
  },
};
</script>
