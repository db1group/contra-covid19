<template>
  <div class="px-2">
    <h4 class="primary--text title">9. FREQUENTOU UNIDADE SAÚDE</h4>
    <v-row>
      <v-col cols="12">
        <v-checkbox
          :input-value="frequentouCnes.frequentouUnidade"
          label="Sim"
          hide-details
          @change="updateFrequentouUnidade"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-container fluid class="pa-0">
      <v-row dense>
        <v-col>
          <v-autocomplete
            :value="frequentouCnes.unidadeFrequentadaId"
            :rules="rules.unidadeFrequentadaId"
            label="Unidade Frequentada *"
            :items="unidades.items"
            @update:search-input="searchUnidades"
            item-text="nome"
            item-value="id"
            ref="unidadeFrequentadaId"
            :loading="unidades.loading"
            no-data-text="Unidade não encontrada"
            @input="updateUnidadeFrequentadaId"
            validate-on-blur
            :disabled="disableFields"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import FrequentouCnes from '@/entities/FrequentouCnes';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';
import { required } from '@/validations/CommonValidations';

export default {
  directives: { mask },
  components: {
  },
  props: {
    frequentouCnes: {
      type: FrequentouCnes,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  watch: {
    frequentouCnes(frequentouCnes) {
      this.carregarDadosUnidade(frequentouCnes);
    },
  },
  data: () => ({
    unidades: {
      items: [],
      loading: false,
    },
    searchUnidade: null,
    rules: {
      unidadeFrequentadaId: [],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.frequentouCnes.frequentouUnidade;
    },
  },
  methods: {
    updateFrequentouUnidade(frequentouUnidade) {
      this.$emit('update:frequentouUnidade', frequentouUnidade);
      if (!frequentouUnidade) {
        this.searchUnidade = null;
        this.updateUnidadeFrequentadaId(null);
        this.removeRequiredInFields();
        return;
      }
      this.findUnidades();
      this.addRequiredInFields();
    },
    validate() {
      this.$refs.unidadeFrequentadaId.validate();
    },
    removeRequiredInFields() {
      this.rules.unidadeFrequentadaId = [];
      this.validate();
    },
    addRequiredInFields() {
      this.rules.unidadeFrequentadaId.push(required);
      this.validate();
    },
    updateUnidadeFrequentadaId(unidadeFrequentadaId) {
      this.$emit('update:unidadeFrequentadaId', unidadeFrequentadaId);
      this.$refs.unidadeFrequentadaId.resetValidation();
    },
    searchUnidades(search) {
      if (search === this.searchUnidade) return;
      this.searchUnidade = search ? search.trim().toUpperCase() : '';
      this.findUnidades(this.searchUnidade);
    },
    findUnidades(searchUnidade) {
      if (this.unidades.loading) return;
      this.unidades.loading = true;
      UnidadeSaudeService.findAll(searchUnidade)
        .then(({ data }) => {
          this.unidades.items = data;
        })
        .finally(() => {
          this.unidades.loading = false;
        });
    },
    carregarDadosUnidade(frequentouCnes) {
      this.findUnidades(frequentouCnes.nomeFrequentada);
      if (frequentouCnes.frequentouUnidade) {
        this.addRequiredInFields();
      }
    },
  },
  created() {
    this.findUnidades();
  },
};
</script>
