<template>
  <section style="margin-top: 45px;">
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <h4 class="primary--text my-7 m-0 mb-0 display-1">Fechamento Manual</h4>
        </v-col>
      </v-row>
      <fechamento-manual-cons
        @erro:reabrirFechamento="mostrarMensagemErro"
        @erro:consultarFechamentos="mostrarMensagemErro"
        @success:reabrirFechamento="mostrarMensagemSucesso"
      />
    </v-container>
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="notificacao-cons__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </section>
</template>
<script>
import FechamentoManualCons from '@/components/FechamentoManual/Cons.vue';
import keycloak from '@/services/KeycloakService';

export default {
  components: {
    FechamentoManualCons,
  },
  data: () => ({
    showError: false,
    showSuccess: false,
    mensagemSucesso: '',
    mensagemErro: '',
  }),
  methods: {
    mostrarMensagemErro(msg) {
      this.showError = true;
      this.mensagemErro = msg || 'Não foi possível realizar a ação. Tente novamente!';
    },
    mostrarMensagemSucesso(msg) {
      this.showSuccess = true;
      this.mensagemSucesso = msg || 'Fechamento encerrado com sucesso!';
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!keycloak.realmAccess.roles.includes('FECHAMENTO')) {
      return;
    }
    const { msg } = to.params;
    let enter = true;
    if (msg) {
      enter = (vm) => vm.mostrarMensagemSucesso(msg);
    }
    next(enter);
  },
};
</script>
