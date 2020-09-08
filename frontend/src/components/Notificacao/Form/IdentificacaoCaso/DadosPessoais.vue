<template>
  <div>
    <v-row dense>
      <v-col cols="6" sm="6" md="6">
        <v-text-field
          :value="dataHoraNotificacao"
          label="Data e hora da notificação *"
          v-mask="'##/##/#### ##:##'"
          validate-on-blur
          :rules="rules.dataHoraNotificacao"
          @input="updateDataHoraNotificacao"
          :disabled="disabled"
        />
      </v-col>
      <v-col cols="6" sm="6" md="6">
        <v-text-field
          :value="dataEncerramento"
          label="Data de encerramento"
          v-mask="'##/##/####'"
          :rules="rules.dataEncerramento"
          @input="updateDataEncerramento"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-radio-group
          :value="suspeito.tipoClassificacaoPessoa"
          class="mt-0"
          @change="updateTipoClassificacaoPessoa"
          :rules="rules.tipoClassificacaoPessoa"
          row
          :disabled="disabled"
        >
          <v-radio label="Criança até 15 anos" value="CRIANCA_ATE_12_ANOS" class="mb-2" />
          <v-radio label="Em situação de Rua" value="EM_SITUACAO_RUA" class="mb-2" />
          <v-radio label="Estrangeiro" value="ESTRANGEIRO" class="mb-2" />
          <v-radio label="Indígena" value="INDIGENA" class="mb-2" />
          <v-radio label="Privado de Liberdade" value="PRIVADO_LIBERDADE" class="mb-2" />
          <v-radio label="Outro" value="OUTRO" class="mb-2" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-autocomplete
          :value="suspeito.institucionalizado"
          label="Paciente institucionalizado"
          :items="institucionalizados"
          item-text="value"
          item-value="key"
          :disabled="disabled"
          @input="updatePacienteInstitucionalizado"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-autocomplete
          v-if="suspeito.institucionalizado !== null"
          :value="suspeito.tpInstitucionalizado"
          :rules="rules.tpInstitucionalizado"
          :items="tpInstitucionalizados"
          item-text="value"
          item-value="key"
          label="Tipo institucionalizado"
          :disabled="disabled"
          @input="updateTpPacienteInstitucionalizado"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-autocomplete
          v-if="suspeito.institucionalizado !== null"
          :value="suspeito.instituicaoId"
          :rules="rules.instituicaoId"
          label="Instituição"
          :items="instituicoes.items"
          @update:search-input="searchInstituicoes"
          item-value="id"
          item-text="nome"
          :loading="instituicoes.loading"
          no-data-text="Instituição não encontrada"
          @input="updateInstituicao"
          :disabled="disabled"
        >
          <template slot="item" slot-scope="{ item }">
            <div
              class="v-list-item__title"
              :title="`${item.nome} - ${item.municipio}`"
            >{{ item.nome }} - {{ item.municipio }}</div>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="3" md="3">
        <v-select
          :value="suspeito.tipoDocumento"
          :rules="rules.tipoDocumento"
          :label="'Tipo de documento *'"
          :items="tiposDocumento"
          item-text="value"
          item-value="key"
          :disabled="disabledTipoDocumento"
          @input="updateTipoDocumento"
        />
      </v-col>
      <v-col cols="12" sm="5" md="5">
        <v-text-field
          v-show="suspeito.tipoDocumento === 'CPF'"
          :value="suspeito.numeroCpf"
          label="Número do documento *"
          v-mask="'###.###.###-##'"
          :rules="rules.numeroCpf"
          :disabled="disabled"
          @input="updateNumeroCpf"
        />
        <v-text-field
          v-show="suspeito.tipoDocumento !== 'CPF'"
          :value="suspeito.numeroDocumento"
          label="Número do documento"
          :disabled="disabled"
          @input="updateNumeroDocumento"
        />
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
          v-show="suspeito.tipoClassificacaoPessoa === 'ESTRANGEIRO'"
          :value="suspeito.passaporte"
          label="Passaporte"
          :disabled="disabled"
          :rules="rules.passaporte"
          @input="updatePassaporte"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6" md="5">
        <label class="primary--text body-1 font-weight-bold">Sexo *</label>
        <v-radio-group
          :value="suspeito.sexo"
          class="mt-0"
          @change="updateSexo"
          :rules="rules.sexo"
          row
          persistent-hint
          :hint="hintPossuiFechamento()"
          :disabled="disabled || possuiFechamento"
        >
          <v-radio label="Masculino" value="M" />
          <v-radio label="Feminino" value="F" />
        </v-radio-group>
      </v-col>
      <v-col v-show="suspeito.sexo === 'F'" cols="12" sm="6">
        <label class="primary--text body-1 font-weight-bold">Gestante *</label>
        <v-radio-group
          :value="suspeito.gestante"
          class="mt-0"
          @change="updateGestante"
          :rules="rules.gestante"
          row
          :disabled="disabled"
        >
          <v-radio label="Sim" value="true" />
          <v-radio label="Não" value="false" />
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row dense v-show="suspeito.sexo === 'F' && suspeito.gestante === 'true'">
      <v-col>
        <v-radio-group
          :value="suspeito.tipoPeriodoGestacional"
          :rules="rules.tipoPeriodoGestacional"
          @change="updateTipoPeriodoGestacional"
          :disabled="disabled"
        >
          <template v-slot:label>
            <label class="primary--text body-1 font-weight-bold">Período de gestação *</label>
          </template>
          <v-radio value="PRIMEIRO_TRIMESTRE" label="1º Trimestre" />
          <v-radio value="SEGUNDO_TRIMESTRE" label="2º Trimestre" />
          <v-radio value="TERCEIRO_TRIMESTRE" label="3º Trimestre" />
          <v-radio value="IDADE_GESTACIONAL_IGNORADA" label="Idade gestacional ignorada" />
        </v-radio-group>
      </v-col>
      <v-col>
        <v-checkbox
          :input-value="suspeito.gestanteAltoRisco"
          label="Gestante de Alto Risco?"
          hide-details
          @change="updateGestanteAltoRisco"
          :disabled="disabled"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-text-field
          :value="suspeito.nome"
          :rules="rules.nome"
          label="Nome completo *"
          @input="updateNome"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          :value="suspeito.nomeDaMae"
          label="Nome da mãe *"
          @input="updateNomeDaMae"
          :rules="rules.nomeDaMae"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="5" md="5">
        <v-text-field
          :value="suspeito.dataDeNascimento"
          ref="dataDeNascimento"
          label="Data de nascimento *"
          append-icon="mdi-calendar-blank"
          v-mask="'##/##/####'"
          :rules="rules.dataDeNascimento"
          validate-on-blur
          @input="updateDataDeNascimento"
          :disabled="disabled || possuiFechamento"
          persistent-hint
          :hint="hintPossuiFechamento()"
        />
      </v-col>
      <v-spacer />
      <v-col cols="12" sm="5" md="5">
        <v-select
          :value="suspeito.racaCor"
          :rules="rules.racaCor"
          label="Raça/Cor"
          :items="racasCores"
          item-text="value"
          item-value="key"
          @input="updateRacaCor"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  required, dateFormat, dateHourMinuteFormat, exactLengthNumbersWithMask, dateMustBeLesserThanToday,
  maxLength, minLength, onlyLetters, maxAge, dateMustBeLesserEqualsThanTodayWithMinutes,
} from '@/validations/CommonValidations';
import { mask } from 'vue-the-mask';
import Pessoa from '@/entities/Pessoa';
import InstituicaoService from '@/services/InstituicaoService';

const TIPOS_DOCUMENTO = [
  { key: 'CPF', value: 'CPF' },
  { key: 'RG', value: 'RG' },
  { key: 'CNH', value: 'CNH' },
  { key: 'SUS', value: 'Carteira do SUS' },
];

const RACAS_CORES = [
  { key: 'BRANCA', value: 'Branca' },
  { key: 'PRETA', value: 'Preta' },
  { key: 'AMARELA', value: 'Amarela' },
  { key: 'PARDA', value: 'Parda' },
  { key: 'INDIGENA', value: 'Indígena' },
  { key: 'IGNORADO', value: 'Ignorado' },
];

const INSTITUCIONALIOZADOS = [
  { key: null, value: 'Não informado' },
  { key: 'UNIDADES_PRISIONAIS', value: 'Unidades Prisionais (Presídios e Cadeias)' },
  { key: 'CASA_REPOUSO_ASILO', value: 'ILPI/Casa de Repouso/Asilo' },
  { key: 'SERVICOS_ACOLHIMENTO', value: 'Serviços de Acolhimento Institucional SUAS' },
  { key: 'CENTRO_SOCIO_EDUCACAO', value: 'Centro de Sócio Educação (CENSE e Casas de Semiliberdade' },
  {
    key: 'CLINICAS_REABILITACAO',
    value: 'Clínicas de recuperação ou reabilitação (psiquiatria e dependência química)',
  },
  { key: 'SEMINARIO_CONVENTO', value: 'Seminário / Convento' },
];

const TPINSTITUCIONALIZADOS = [
  { key: 'TRABALHADOR', value: 'Trabalhador da instituição' },
  { key: 'COABITANTE', value: 'Coabitante da instituição' },
];

export default {
  directives: { mask },
  props: {
    dataHoraNotificacao: {
      type: String,
      default: '',
    },
    dataEncerramento: {
      type: String,
      default: '',
    },
    suspeito: {
      type: Pessoa,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
    possuiFechamento: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    tiposDocumento: TIPOS_DOCUMENTO,
    racasCores: RACAS_CORES,
    institucionalizados: INSTITUCIONALIOZADOS,
    tpInstitucionalizados: TPINSTITUCIONALIZADOS,
    rules: {
      dataHoraNotificacao: [required, dateHourMinuteFormat, dateMustBeLesserEqualsThanTodayWithMinutes],
      tipoDocumento: [required],
      numeroCpf: [exactLengthNumbersWithMask(11)],
      nome: [required, onlyLetters, maxLength(150), minLength(3)],
      nomeDaMae: [required, onlyLetters, maxLength(150), minLength(3)],
      dataDeNascimento: [required, dateFormat],
      sexo: [required],
      gestante: [],
      tipoPeriodoGestacional: [],
      racaCor: [required],
      tipoClassificacaoPessoa: [required],
      passaporte: [],
      tpInstitucionalizado: [],
      instituicaoId: [],
      dataEncerramento: [dateFormat],
    },
    disabledTipoDocumento: true,
    labelNumeroDocumento: 'Número do documento *',
    instituicoes: {
      items: [],
      loading: false,
    },
    searchInstituicao: null,
  }),
  methods: {
    updateDataHoraNotificacao(dataHoraNotificacao) {
      this.$emit('update:dataHoraNotificacao', dataHoraNotificacao);
    },
    updateDataEncerramento(dataEncerramento) {
      this.$emit('update:dataEncerramento', dataEncerramento);
    },
    updateTipoDocumento(tipoDocumento) {
      if (this.suspeito.tipoDocumento !== tipoDocumento) {
        this.updateNumeroDocumento('');
        this.updateNumeroCpf('');
      }
      this.$emit('update:tipoDocumento', tipoDocumento);
    },
    updateNumeroDocumento(numeroDocumento) {
      this.$emit('update:numeroDocumento', numeroDocumento);
    },
    updateNumeroCpf(numeroCpf) {
      this.$emit('update:numeroCpf', numeroCpf);
    },
    updateNome(nome) {
      this.$emit('update:nome', nome);
    },
    updateNomeDaMae(nomeDaMae) {
      this.$emit('update:nomeDaMae', nomeDaMae);
    },
    updateSexo(sexo) {
      this.$emit('update:sexo', sexo);
      this.updateGestante();
    },
    updateGestante(gestante) {
      this.$emit('update:gestante', gestante);
      this.unselectTipoPeriodoGestacional();
    },
    updateRacaCor(racaCor) {
      this.$emit('update:racaCor', racaCor);
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
    updateTipoPeriodoGestacional(tipoPeriodoGestacional) {
      this.$emit('update:tipoPeriodoGestacional', tipoPeriodoGestacional);
    },
    updateGestanteAltoRisco(gestanteAltoRisco) {
      this.$emit('update:gestanteAltoRisco', gestanteAltoRisco);
    },
    unselectTipoPeriodoGestacional() {
      if (this.suspeito.sexo === 'M' || this.suspeito.gestante !== 'true') {
        this.$emit('update:tipoPeriodoGestacional', null);
      }
    },
    updateTipoClassificacaoPessoa(tipoClassificacaoPessoa) {
      this.disableTipoDocumento(tipoClassificacaoPessoa);
      this.$emit('update:tipoClassificacaoPessoa', tipoClassificacaoPessoa);
      this.checkMaxAge(tipoClassificacaoPessoa);
    },
    checkMaxAge(value) {
      if (value === 'CRIANCA_ATE_12_ANOS') {
        this.rules.dataDeNascimento.push(maxAge(15));
      } else {
        this.rules.dataDeNascimento = [required, dateFormat, this.validateFutureDate];
      }
      this.$refs.dataDeNascimento.validate();
    },
    requiredIfSexoForFeminino(value) {
      if (this.suspeito.sexo === 'M') {
        return true;
      }
      return required(value);
    },
    requiredIfGestante(value) {
      if (this.suspeito.sexo === 'M' || this.suspeito.gestante !== 'true') {
        return true;
      }
      return required(value);
    },
    requiredIfEstrangeiro(value) {
      return this.suspeito.tipoClassificacaoPessoa !== 'ESTRANGEIRO' ? true : required(value);
    },
    validateFutureDate(value) {
      return dateMustBeLesserThanToday(value, 'Informe uma data anterior ao dia de hoje.');
    },
    disableTipoDocumento(tipoClassificacaoPessoa) {
      if (this.disabled) {
        this.disabledTipoDocumento = true;
        return;
      }

      if (tipoClassificacaoPessoa === 'OUTRO') {
        this.disabledTipoDocumento = true;
        this.updateTipoDocumento('CPF');
        return;
      }

      this.disabledTipoDocumento = false;
    },
    requiredIfCpfAndTipoOutros(value) {
      if (this.suspeito.tipoDocumento !== 'CPF' || this.suspeito.tipoClassificacaoPessoa !== 'OUTROS') {
        return true;
      }
      return required(value);
    },
    hintPossuiFechamento() {
      return this.possuiFechamento ? 'Não é possivel alterar pois já foi realizado o fechamento.' : '';
    },
    updatePassaporte(passaporte) {
      this.$emit('update:passaporte', passaporte);
    },
    updateTpPacienteInstitucionalizado(tpInstitucionalizado) {
      this.$emit('update:tpInstitucionalizado', tpInstitucionalizado);
    },
    updateInstituicao(instituicaoId) {
      this.$emit('update:instituicaoId', instituicaoId);
      this.searchInstituicao = null;
    },
    updatePacienteInstitucionalizado(institucionalizado) {
      if (!institucionalizado) {
        this.updateTpPacienteInstitucionalizado(null);
        this.updateInstituicao(null);
      }
      this.$emit('update:institucionalizado', institucionalizado);
    },
    searchInstituicoes(search) {
      if (search === this.searchInstituicao) return;
      if (Array.isArray(this.searchInstituicao) && this.searchInstituicao[0] === search) return;
      this.searchInstituicao = search ? search.trim().toUpperCase().split() : '';
      this.findInstituicoes(this.searchInstituicao);
    },
    findInstituicoes(searchInstituicao = '') {
      this.instituicoes.loading = true;
      InstituicaoService.findAll(searchInstituicao)
        .then(({ data }) => {
          this.instituicoes.items = data;
        })
        .finally(() => { this.instituicoes.loading = false; });
    },
    requiredIfInstitucionalizado(value) {
      return this.suspeito.institucionalizado === null ? true : required(value);
    },
  },
  watch: {
    suspeito(suspeito) {
      this.findInstituicoes(suspeito.instituicaoNome);
    },
    'suspeito.tipoClassificacaoPessoa': function classificacaoPessoa(novoValor) {
      this.updateTipoClassificacaoPessoa(novoValor);
    },
  },
  created() {
    this.rules.numeroCpf.push(this.requiredIfCpfAndTipoOutros);
    this.rules.gestante.push(this.requiredIfSexoForFeminino);
    this.rules.tipoPeriodoGestacional.push(this.requiredIfGestante);
    this.rules.dataDeNascimento.push(this.validateFutureDate);
    this.rules.passaporte.push(this.requiredIfEstrangeiro);
    this.rules.tpInstitucionalizado.push(this.requiredIfInstitucionalizado);
    this.rules.instituicaoId.push(this.requiredIfInstitucionalizado);
    this.findInstituicoes();
  },
};
</script>
