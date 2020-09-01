<template>
  <div class="px-2">
    <h4 class="primary--text title">8. HOSPITALIZAÇÃO</h4>
    <v-row>
      <v-col cols="12">
        <v-checkbox
          :input-value="hospitalizacao.hospitalizado"
          label="Sim"
          hide-details
          @change="updateHospitalizado"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-container fluid class="pa-0">
      <v-row dense>
        <v-col cols="12" sm="6" md="6">
          <v-autocomplete
            :value="hospitalizacao.cnesHospitalId"
            :rules="rules.cnesHospitalId"
            label="Hospital *"
            :items="hospitais.items"
            @update:search-input="searchHospitais"
            item-text="nome"
            item-value="id"
            ref="cnesHospitalId"
            :loading="hospitais.loading"
            no-data-text="Hospital não encontrada"
            @input="updateCnesHospitalId"
            validate-on-blur
            :disabled="disableFields"
          />
        </v-col>
        <v-col>
          <v-checkbox
            :input-value="hospitalizacao.internacaoSus"
            label="Internação SUS"
            hide-details
            @change="updateInternacaoSus"
            :disabled="disableFields"
          />
        </v-col>
        <v-col>
          <v-radio-group
            :value="hospitalizacao.tipoLeito"
            label="Leito de internação *"
            ref="tipoLeito"
            :rules="rules.tipoLeito"
            class="d-inline-flex flex-row"
            @change="updateTipoLeito"
            :disabled="disableFields"
          >
            <v-radio value="ENFERMARIA" label="Enfermaria" />
            <v-radio value="UTI" label="UTI" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="6" sm="6" md="4">
          <v-text-field
            :value="hospitalizacao.dataInternamento"
            ref="dataInternamento"
            label="Data de Internamento *"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataInternamento"
            validate-on-blur
            @input="updateDataInternamento"
            :disabled="disableFields"
          />
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            :value="hospitalizacao.dataIsolamento"
            ref="dataIsolamento"
            label="Data de Isolamento"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataIsolamento"
            validate-on-blur
            @input="updateDataIsolamento"
            :disabled="disableFields"
          />
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            :value="hospitalizacao.dataAlta"
            ref="dataAlta"
            label="Data da Alta"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataAlta"
            validate-on-blur
            @input="updateDataAlta"
            :disabled="disableFields"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            :value="hospitalizacao.dataObito"
            ref="dataObito"
            label="Data do Óbito"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :rules="rules.dataObito"
            validate-on-blur
            @input="updateDataObito"
            :disabled="disableFields"
          />
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            :value="hospitalizacao.numeroDo"
            label="Número da DO"
            v-mask="'##################'"
            :disabled="disableFields"
            :rules="rules.numeroDo"
            ref="numeroDo"
            @input="updateNumeroDo"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import Hospitalizacao from '@/entities/Hospitalizacao';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';
import {
  required,
  dateFormat,
  dateMustBeLesserEqualsThanToday,
  greaterThanMinimumDate,
  maxLength,
} from '@/validations/CommonValidations';

export default {
  directives: { mask },
  components: {

  },
  props: {
    hospitalizacao: {
      type: Hospitalizacao,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  watch: {
    hospitalizacao(hospitalizacao) {
      this.carregarDadosHospitalizacao(hospitalizacao);
    },
  },
  data: () => ({
    hospitais: {
      items: [],
      loading: false,
    },
    searchHospital: null,
    rules: {
      dataInternamento: [],
      cnesHospitalId: [],
      tipoLeito: [],
      dataIsolamento: [],
      dataAlta: [],
      dataObito: [],
      numeroDo: [maxLength(18)],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.hospitalizacao.hospitalizado;
    },
  },
  methods: {
    updateHospitalizado(hospitalizado) {
      this.$emit('update:hospitalizado', hospitalizado);
      if (!hospitalizado) {
        this.searchHospital = null;
        this.updateCnesHospitalId(null);
        this.updateInternacaoSus(null);
        this.updateTipoLeito(null);
        this.updateDataInternamento(null);
        this.updateDataIsolamento(null);
        this.updateDataAlta(null);
        this.updateDataObito(null);
        this.updateNumeroDo(null);
        this.removeRequiredInFields();
        return;
      }
      this.findHospitais();
      this.addRequiredInFields();
    },
    resetarValidacoes() {
      this.$refs.cnesHospitalId.resetValidation();
      this.$refs.tipoLeito.resetValidation();
      this.$refs.dataInternamento.resetValidation();
      this.$refs.dataIsolamento.resetValidation();
      this.$refs.dataAlta.resetValidation();
      this.$refs.dataObito.resetValidation();
      this.$refs.numeroDo.resetValidation();
    },
    validate() {
      this.$refs.cnesHospitalId.validate();
      this.$refs.tipoLeito.validate();
      this.$refs.dataInternamento.validate();
      this.$refs.dataIsolamento.validate();
      this.$refs.dataAlta.validate();
      this.$refs.dataObito.validate();
      this.$refs.numeroDo.validate();
    },
    removeRequiredInFields() {
      this.rules.dataInternamento = [];
      this.rules.cnesHospitalId = [];
      this.rules.tipoLeito = [];
      this.rules.dataIsolamento = [];
      this.rules.dataAlta = [];
      this.rules.dataObito = [];
      this.resetarValidacoes();
      this.validate();
    },
    validarDataAlta(value) {
      return greaterThanMinimumDate(value,
        this.hospitalizacao.dataInternamento, 'Informe uma data igual ou posterior a data de internamento.');
    },
    addRequiredInFields() {
      this.rules.cnesHospitalId.push(required);
      this.rules.tipoLeito.push(required);
      this.rules.dataInternamento.push(required, dateFormat, dateMustBeLesserEqualsThanToday);
      this.rules.dataIsolamento.push(dateMustBeLesserEqualsThanToday);
      this.rules.dataAlta.push(dateMustBeLesserEqualsThanToday, this.validarDataAlta);
      this.rules.dataObito.push(dateMustBeLesserEqualsThanToday);
      this.validate();
    },
    updateCnesHospitalId(cnesHospitalId) {
      this.$emit('update:cnesHospitalId', cnesHospitalId);
    },
    updateInternacaoSus(internacaoSus) {
      this.$emit('update:internacaoSus', internacaoSus);
    },
    updateTipoLeito(tipoLeito) {
      this.$emit('update:tipoLeito', tipoLeito);
      this.$refs.tipoLeito.resetValidation();
    },
    updateDataIsolamento(dataIsolamento) {
      this.$emit('update:dataIsolamento', dataIsolamento);
    },
    updateDataAlta(dataAlta) {
      this.$emit('update:dataAlta', dataAlta);
    },
    updateDataInternamento(dataInternamento) {
      this.$emit('update:dataInternamento', dataInternamento);
    },
    searchHospitais(search) {
      if (search === this.searchHospital) return;
      this.searchHospital = search ? search.trim().toUpperCase() : '';
      this.findHospitais(this.searchHospital);
    },
    findHospitais(searchHospital) {
      if (this.hospitais.loading) return;
      this.hospitais.loading = true;
      UnidadeSaudeService.findAllHospitais(searchHospital)
        .then(({ data }) => {
          this.hospitais.items = data;
        })
        .finally(() => {
          this.hospitais.loading = false;
        });
    },
    carregarDadosHospitalizacao(hospitalizacao) {
      this.findHospitais(hospitalizacao.nomeHospital);
      if (hospitalizacao.hospitalizado) {
        this.addRequiredInFields();
      }
    },
    updateDataObito(dataObito) {
      this.$emit('update:dataObito', dataObito);
    },
    updateNumeroDo(numeroDo) {
      this.$emit('update:numeroDo', numeroDo);
    },
  },
  created() {
    this.findHospitais();
  },
};
</script>
