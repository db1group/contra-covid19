<template>
  <v-card class="mx-auto" width="350">
    <v-card-title>
      <h3 class="primary--text">Atualização</h3>
    </v-card-title>
    <v-container fluid>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="8">
            <v-text-field
              :value="evolucao.dataHoraAtualizacao"
              label="Data e hora da notificação *"
              v-mask="'##/##/#### ##:##'"
              validate-on-blur
              :rules="rules.dataHoraAtualizacao"
              @input="updateDataHoraAtualizacao"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              :value="evolucao.local"
              :rules="rules.local"
              label="Local do isolamento *"
              :items="locais.items"
              item-text="value"
              item-value="key"
              :loading="locais.loading"
              no-data-text="Local de isolamento não encontrado"
              @input="updateLocal"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              :value="evolucao.situacao"
              :rules="rules.situacao"
              label="Local do isolamento *"
              :items="situacoes.items"
              item-text="value"
              item-value="key"
              :loading="situacoes.loading"
              no-data-text="Situação do paciente não encontrada"
              @input="updateSituacao"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="cadastrarEvolucao">ATUALIZAR NOTIFICÃO</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { required, dateHourMinuteFormat } from '@/validations/CommonValidations';
import { mask } from 'vue-the-mask';
import NotificacaoEvolucao, { locaisList, situacoesList } from '@/entities/NotificacaoEvolucao';
import EvolucaoService from '@/services/EvolucaoService';

export default {
  directives: { mask },
  props: {
    notificacaoId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    evolucao: new NotificacaoEvolucao(),
    locais: {
      items: [],
      loading: true,
    },
    situacoes: {
      items: [],
      loading: true,
    },
    rules: {
      dataHoraAtualizacao: [required, dateHourMinuteFormat],
      local: [required],
      situacao: [required],
    },
  }),
  methods: {
    loadLocais() {
      this.locais.loading = true;
      this.locais.items = locaisList;
      this.locais.loading = false;
    },
    loadSituacoes() {
      this.situacoes.loading = true;
      this.situacoes.items = situacoesList;
      this.situacoes.loading = false;
    },
    updateDataHoraAtualizacao(dataHoraAtualizacao) {
      this.evolucao.dataHoraAtualizacao = dataHoraAtualizacao;
    },
    updateLocal(local) {
      this.evolucao.local = local;
    },
    updateSituacao(situacao) {
      this.evolucao.situacao = situacao;
    },
    cadastrarEvolucao() {
      if (this.$refs.form.validate()) {
        const requestEvolucao = this.evolucao.toRequest();
        requestEvolucao.notificacaoId = this.notificacaoId;
        EvolucaoService.save(requestEvolucao).then(() => {
          this.$refs.form.reset();
          this.$emit('sucess:cadastroEvolucao', 'Evolução cadastrada com sucesso.');
          this.evolucao = new NotificacaoEvolucao();
        }).catch((error) => {
          const { data } = error.response;
          this.$emit('error:cadastroEvolucao', data.error);
        });
      }
    },
  },
  created() {
    this.loadLocais();
    this.loadSituacoes();
  },
};
</script>
