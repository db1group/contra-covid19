<template>
  <div class="px-2">
    <h4 class="primary--text title">10. REALIZADO COLETA DE MATERIAL PARA DIAGNÓSTICO</h4>
    <v-container fluid class="pa-0">
      <v-row dense>
        <v-col>
          <v-checkbox
            :input-value="conclusaoAtendimento.coletaMaterialParaDiagnostico"
            label="Sim"
            hide-details
            @change="updateRealizadaColeta"
            :disabled="disabled"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6" md="6">
          <v-radio-group
            label="Tipo de laboratório *"
            :value="conclusaoAtendimento.tipoLaboratorio"
            :rules="rules.tipoLaboratorio"
            ref="tipoLaboratorio"
            @change="changeTipoLaboratorio"
            :disabled="disableFields"
          >
            <v-radio value="OFICIAL" label="Laboratório Oficial" />
            <v-radio value="PRIVADO" label="Laboratório da rede PRIVADA" />
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.nomeLaboratorioEnvioMaterial"
            label="Nome do laboratório"
            :disabled="disableNomeLab"
            @input="updateNomeLaboratorioEnvioMaterial"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.dataCadastroExame"
            label="Data de Cadastro"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :disabled="disableFields"
            :rules="rules.dataCadastroExame"
            ref="dataCadastroExame"
            @input="updateDataCadastroExame"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.dataDaColeta"
            label="Data da Coleta *"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :disabled="disableFields"
            :rules="rules.dataDaColeta"
            ref="dataDaColeta"
            @input="updateDataDaColeta"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.dataRecebimentoExame"
            label="Data do Recebimento"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :disabled="disableFields"
            :rules="rules.dataRecebimentoExame"
            ref="dataRecebimentoExame"
            @input="updateDataRecebimentoExame"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.dataLiberacaoExame"
            label="Data da Liberação"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
            :disabled="disableFields"
            :rules="rules.dataLiberacaoExame"
            ref="dataLiberacaoExame"
            @input="updateDataLiberacaoExame"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.codigoExame"
            label="Código do Exame"
            v-mask="'##################'"
            :rules="rules.codigoExame"
            :disabled="disableFields"
            @input="updateCodigoExame"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            :value="conclusaoAtendimento.requisicao"
            label="Requisição"
            :rules="rules.requisicao"
            :disabled="disableFields"
            @input="updateRequisicao"
          />
        </v-col>
      </v-row>
      <!--
      <v-row dense>
        <v-col>
          <v-select
            v-model="conclusaoAtendimento.metodoDeExame"
            :items="itemsMetodoExame"
            item-text="label"
            item-value="value"
            :rules="rules.metodoDeExame"
            ref="metodoDeExame"
            label="Método do exame"
            :disabled="disableFields"
            @input="updateMetodoDeExame"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6" md="6">
          <v-autocomplete
            :value="conclusaoAtendimento.exameId"
            label="Exame"
            :items="exames.items"
            @update:search-input="searchExames"
            item-text="nome"
            item-value="id"
            :loading="exames.loading"
            no-data-text="Exame não encontrado"
            ref="exameId"
            @input="updateExameId"
            :disabled="disableFields"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-autocomplete
            :value="conclusaoAtendimento.resultadoExameId"
            label="Resultado"
            :items="resultados.items"
            @update:search-input="searchResultados"
            item-text="nome"
            item-value="id"
            :loading="resultados.loading"
            no-data-text="Resultado não encontrado"
            ref="resultadoExameId"
            @input="updateResultadoExameId"
            :disabled="disableFields"
          />
        </v-col>
      </v-row>
      -->
      <v-row dense>
        <v-col cols="12" sm="6" md="6">
          <v-autocomplete
            :value="conclusaoAtendimento.labAmostraId"
            label="Lab. para envio da amostra"
            :items="laboratorio.items"
            @update:search-input="searchLaboratorios"
            item-text="nome"
            item-value="id"
            :loading="laboratorio.loading"
            no-data-text="Laboratório não encontrado"
            @input="updateLabAmostraId"
            :disabled="disableFields"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="conclusaoAtendimento.pesquisaGal"
            :items="itemsPesquisa"
            item-text="label"
            clearable
            item-value="value"
            label="Pesquisa"
            :disabled="disableFields"
            @input="updatePesquisaGal"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import {
  required,
  dateFormat,
  dateMustBeLesserEqualsThanToday,
  maxLengthNumbersWithMask,
  maxLength,
  greaterThanMinimumDate,
} from '@/validations/CommonValidations';
import ConclusaoAtendimento from '@/entities/ConclusaoAtendimento';
import ExameService from '@/services/ExameService';
import ResultadoExameService from '@/services/ResultadoExameService';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';

export default {
  directives: { mask },
  props: {
    conclusaoAtendimento: {
      type: ConclusaoAtendimento,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    rules: {
      dataDaColeta: [],
      tipoLaboratorio: [],
      metodoDeExame: [],
      dataCadastroExame: [dateMustBeLesserEqualsThanToday],
      dataRecebimentoExame: [],
      dataLiberacaoExame: [],
      codigoExame: [maxLengthNumbersWithMask(18)],
      requisicao: [maxLength(150)],
    },
    searchExame: null,
    exames: {
      items: [],
      loading: false,
    },
    searchResultado: null,
    resultados: {
      items: [],
      loading: false,
    },
    itemsPesquisa: [
      { label: 'COVID-19 Profissionais da Saúde e Ambulatorial não internado', value: '10017' },
      { label: 'Pesquisa de Vírus Respiratórios', value: '10087' },
    ],
    searchLab: null,
    laboratorio: {
      items: [],
      loading: false,
    },
    itemsMetodoExame: [
      { label: 'RT-PCR', value: 'RT-PCR' },
      { label: 'Teste rápido', value: 'TESTE_RAPIDO' },
      { label: 'ELISA', value: 'ELISA' },
      { label: 'Quimioluminescência', value: 'QUIMIOLUMINESCENCIA' },
      { label: 'Imunofluorescência', value: 'IMUNOFLUORESCENCIA' },
    ],
  }),
  watch: {
    conclusaoAtendimento(conclusaoAtendimento) {
      this.carregarDadosConclusao(conclusaoAtendimento);
    },
  },
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.conclusaoAtendimento.coletaMaterialParaDiagnostico;
    },
    disableNomeLab() {
      if (this.disabled) return true;
      return this.conclusaoAtendimento.tipoLaboratorio !== 'PRIVADO';
    },
  },
  methods: {
    updateRealizadaColeta(coletaMaterialParaDiagnostico) {
      this.$emit('update:coletaMaterialParaDiagnostico', coletaMaterialParaDiagnostico);
      if (!coletaMaterialParaDiagnostico) {
        this.searchExame = null;
        this.searchResultado = null;
        this.searchLab = null;
        this.unselectTipoLaboratorio();
        this.updateDataDaColeta('');
        this.updateDataCadastroExame('');
        this.updateDataRecebimentoExame('');
        this.updateDataLiberacaoExame('');
        this.updateCodigoExame('');
        this.updateRequisicao('');
        this.updateMetodoDeExame(null);
        this.updateNomeLaboratorioEnvioMaterial('');
        this.updateExameId(null);
        this.updateResultadoExameId(null);
        this.updateLabAmostraId(null);
        this.updatePesquisaGal('');
        this.removeRequiredInFields();
        return;
      }
      this.addRequiredInFields();
    },
    changeTipoLaboratorio(tipoLaboratorio) {
      this.$emit('update:tipoLaboratorio', tipoLaboratorio);

      if (tipoLaboratorio !== 'PRIVADO') {
        this.updateNomeLaboratorioEnvioMaterial('');
      }
    },
    unselectTipoLaboratorio() {
      this.$emit('update:tipoLaboratorio', null);
    },
    updateDataDaColeta(dataDaColeta) {
      this.$emit('update:dataDaColeta', dataDaColeta);
    },
    updateMetodoDeExame(metodoDeExame) {
      this.$emit('update:metodoDeExame', metodoDeExame);
    },
    updatePesquisaGal(pesquisaGal) {
      this.$emit('update:pesquisaGal', pesquisaGal);
    },
    updateNomeLaboratorioEnvioMaterial(nomeLaboratorioEnvioMaterial) {
      this.$emit('update:nomeLaboratorioEnvioMaterial', nomeLaboratorioEnvioMaterial);
    },
    validate() {
      this.$refs.dataDaColeta.validate();
      this.$refs.tipoLaboratorio.validate();
      // this.$refs.metodoDeExame.validate();
      this.$refs.dataCadastroExame.validate();
      this.$refs.dataRecebimentoExame.validate();
      this.$refs.dataLiberacaoExame.validate();
    },
    removeRequiredInFields() {
      this.rules.dataDaColeta = [];
      this.rules.tipoLaboratorio = [];
      this.rules.metodoDeExame = [];
      this.rules.dataRecebimentoExame = [];
      this.rules.dataLiberacaoExame = [];
      this.validate();
    },
    addRequiredInFields() {
      this.rules.dataDaColeta.push(required, dateFormat, dateMustBeLesserEqualsThanToday);
      this.rules.tipoLaboratorio.push(required);
      this.rules.metodoDeExame.push(required);
      this.rules.dataRecebimentoExame.push(dateMustBeLesserEqualsThanToday,
        this.validarDataMaiorColeta,
        this.validarDataMaiorCadastro);
      this.rules.dataLiberacaoExame.push(dateMustBeLesserEqualsThanToday,
        this.validarDataMaiorCadastro);
      this.validate();
    },
    updateDataCadastroExame(dataCadastroExame) {
      this.$emit('update:dataCadastroExame', dataCadastroExame);
    },
    updateDataRecebimentoExame(dataRecebimentoExame) {
      this.$emit('update:dataRecebimentoExame', dataRecebimentoExame);
    },
    updateDataLiberacaoExame(dataLiberacaoExame) {
      this.$emit('update:dataLiberacaoExame', dataLiberacaoExame);
    },
    updateCodigoExame(codigoExame) {
      this.$emit('update:codigoExame', codigoExame);
    },
    updateRequisicao(requisicao) {
      this.$emit('update:requisicao', requisicao);
    },
    updateExameId(exameId) {
      this.$emit('update:exameId', exameId);
    },
    updateResultadoExameId(resultadoExameId) {
      this.$emit('update:resultadoExameId', resultadoExameId);
    },
    updateLabAmostraId(labAmostraId) {
      this.$emit('update:labAmostraId', labAmostraId);
    },
    searchExames(search) {
      if (search === this.searchExame) return;
      this.searchExame = search ? search.trim() : undefined;
      this.findExames(this.searchExame);
    },
    findExames(searchExame) {
      if (this.exames.loading) return;
      this.exames.loading = true;
      ExameService.findAll(searchExame)
        .then(({ data }) => {
          this.exames.items = data;
        })
        .finally(() => {
          this.exames.loading = false;
        });
    },
    searchResultados(search) {
      if (search === this.searchResultado) return;
      this.searchResultado = search ? search.trim() : undefined;
      this.findResultados(this.searchResultado);
    },
    findResultados(searchResultado) {
      if (this.resultados.loading) return;
      this.resultados.loading = true;
      ResultadoExameService.findAll(searchResultado)
        .then(({ data }) => {
          this.resultados.items = data;
        })
        .finally(() => {
          this.resultados.loading = false;
        });
    },
    searchLaboratorios(search) {
      if (search === this.searchLab) return;
      this.searchLab = search ? search.trim() : undefined;
      this.findLaboratorios(this.searchLab);
    },
    findLaboratorios(searchLab) {
      if (this.laboratorio.loading) return;
      this.laboratorio.loading = true;
      UnidadeSaudeService.findAllLaboratorios(searchLab)
        .then(({ data }) => {
          this.laboratorio.items = data;
        })
        .finally(() => {
          this.laboratorio.loading = false;
        });
    },
    carregarDadosConclusao(conclusaoAtendimento) {
      this.updateRealizadaColeta(conclusaoAtendimento.coletaMaterialParaDiagnostico);
      this.findExames(conclusaoAtendimento.nomeExame);
      this.findResultados(conclusaoAtendimento.nomeResultado);
      this.findLaboratorios(conclusaoAtendimento.nomeLabAmostra);
    },
    validarDataMaiorColeta(value) {
      return greaterThanMinimumDate(value,
        this.conclusaoAtendimento.dataDaColeta, 'Informe uma data maior ou igual a da coleta.');
    },
    validarDataMaiorCadastro(value) {
      return greaterThanMinimumDate(value,
        this.conclusaoAtendimento.dataCadastroExame, 'Informe uma data maior ou igual a de cadastro.');
    },
  },
  created() {
    this.findExames();
    this.findResultados();
    this.findLaboratorios();
  },
};
</script>
