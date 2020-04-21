<template>
 <section style="margin-top: 35px;">
    <header-title title="Evolução dos pacientes" />
    <v-container fluid>
      <v-row justify="space-around" align="center">
        <v-col cols="auto">
          <evolucao-form
            :notificacao-id="notificacaoId"
            @sucess:cadastroEvolucao="atualizarEvolucao"
            @error:cadastroEvolucao="mostrarMensagemErro" />
        </v-col>
        <v-col cols="auto">
          <evolucao-consulta v-if="evolucao !== null" :evolucao="evolucao" />
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="showError"
      color="error"
      bottom>
      {{ this.mensagemErro }}
    </v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      color="success"
      bottom>
      {{ this.mensagemSucesso }}
    </v-snackbar>
 </section>
</template>
<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import EvolucaoForm from '@/components/Notificacao/Evolucao/Form.vue';
import EvolucaoConsulta from '@/components/Notificacao/Evolucao/Cons.vue';
import EvolucaoService from '@/services/EvolucaoService';
import Evolucao from '@/entities/Evolucao';
import { isSecretariaSaude } from '@/validations/KeycloakValidations';

export default {
  components: {
    HeaderTitle,
    EvolucaoForm,
    EvolucaoConsulta,
  },
  data: () => ({
    evolucao: null,
    notificacaoId: '',
    showError: false,
    mensagemErro: '',
    showSuccess: false,
    mensagemSucesso: '',
  }),
  created() {
    this.notificacaoId = this.$route.params.id;
    this.consultarEvolucao();
  },
  methods: {
    consultarEvolucao() {
      if (!isSecretariaSaude(this)) {
        this.$router.push('/');
      }
      EvolucaoService.findByNotificacaoId(this.notificacaoId)
        .then(({ data }) => {
          this.evolucao = new Evolucao(data).toRequestBody();
        })
        .catch(() => this.$router.push('/'));
    },
    atualizarEvolucao(msg) {
      this.mostrarMensagemSucesso(msg);
      this.consultarEvolucao();
    },
    mostrarMensagemSucesso(msg) {
      this.showSuccess = true;
      this.mensagemSucesso = msg;
    },
    mostrarMensagemErro(msg) {
      this.showError = true;
      this.mensagemErro = msg;
    },
  },
};
</script>
