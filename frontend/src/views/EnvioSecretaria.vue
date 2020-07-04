<template>
  <section style="margin-top: 45px;">
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <h4 class="primary--text my-7 m-0 mb-0 display-1">Envio para Secretaria de Saúde</h4>
        </v-col>
      </v-row>
      <envio-secretaria-index
        @erro:consultarItensPendentesEnvio="mostrarMensagemErro"
        @erro:enviarItensPendentesEnvio="mostrarMensagemErro"
        @success:enviarItensPendentesEnvio="mostrarMensagemSucesso"
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
import EnvioSecretariaIndex from '@/components/EnvioSecretaria/index.vue';

export default {
  components: {
    EnvioSecretariaIndex,
  },
  data: () => ({
    showError: false,
    showSuccess: false,
    mensagemSucesso: '',
    mensagemErro: '',
    showModalDetails: false,
    dataFechamento: null,
  }),
  methods: {
    mostrarMensagemErro(msg) {
      this.showError = true;
      this.mensagemErro = msg || 'Não foi possível realizar a ação. Tente novamente!';
    },
    mostrarMensagemSucesso(msg) {
      this.showSuccess = true;
      this.mensagemSucesso = msg;
    },
  },
};

</script>
<style lang="sass" scoped>
</style>
