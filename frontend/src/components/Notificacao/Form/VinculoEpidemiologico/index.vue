<template>
  <div class="px-2 mt-3">
    <h4 class="primary--text title">
      5. VÍNCULO EPIDEMIOLÓGICO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12" sm="8" md="7" lg="6">
          <v-radio-group
            :value="situacao"
            @change="updateSituacao"
          >
            <v-radio :value="1">
              <template v-slot:label>
                <p class="mb-0">
                  <span class="font-weight-bold">CASO SUSPEITO Situação 1:</span> febre E pelo menos um sinal
                  ou sintoma respiratório (tosse, dificuldade para respirar, batimento das asas nasais, dor
                  de garganta, coriza e chiado no peito).
                </p>
              </template>
            </v-radio>
            <v-radio :value="2">
              <template v-slot:label>
                <p class="mb-0">
                  <span class="font-weight-bold">CONTATO DE CASO SUSPEITO OU CONFIRMADO Situação 2:</span>
                  febre E/OU pelo menos um sinal ou sintoma respiratório (tosse, dificuldade para respirar,
                  batimento das asas nasais, dor de garganta, coriza e chiado no peito)
                  <span class="font-weight-bold">
                    + contato com caso suspeito e/ou confirmado com início dos sintomas,
                  </span>
                  nos últimos 14 dias.
                </p>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field
            :value="vinculoEpidemiologico.nome"
            label="Nome do caso suspeito ou confirmado que teve contato *"
            :rules="rules.nome"
            :disabled="!vinculoEpidemiologico.situacao2"
            @input="updateNome"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { required } from '@/validations/CommonValidations';
import VinculoEpidemiologico from '@/entities/VinculoEpidemiologico';

export default {
  props: {
    vinculoEpidemiologico: {
      type: VinculoEpidemiologico,
      required: true,
    },
  },
  data: () => ({
    situacao: null,
    rules: {
      nome: [],
    },
  }),
  methods: {
    updateSituacao(situacao) {
      this.situacao = situacao;
      if (this.situacao === 1) {
        this.updateSituacao1();
        return;
      }
      this.updateSituacao2();
    },
    updateSituacao1() {
      this.$emit('update:situacao1', true);
      this.$emit('update:situacao2', false);
    },
    updateSituacao2() {
      this.$emit('update:situacao1', false);
      this.$emit('update:situacao2', true);
    },
    updateNome(nome) {
      this.$emit('update:nome', nome);
    },
    updateStateSituacao() {
      if (this.vinculoEpidemiologico.situacao1) {
        this.situacao = 1;
        return;
      }
      if (this.vinculoEpidemiologico.situacao2) {
        this.situacao = 2;
      }
    },
    requiredIfContatoComSuspeito(value) {
      if (!this.vinculoEpidemiologico.situacao2) {
        return true;
      }
      return required(value, 'O campo é obrigatório para a situação 2');
    },
  },
  created() {
    this.updateStateSituacao();
    this.rules.nome.push(this.requiredIfContatoComSuspeito);
  },
};
</script>
