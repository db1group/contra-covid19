<template>
  <section style="margin-top: 45px;">
    <modal-detalhes-fechamento-diario
      v-model="showModalDetails"
    />
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <h4 class="primary--text my-7 m-0 mb-0 display-1">Fechamento Diário</h4>
        </v-col>
      </v-row>
      <fechamento-diario
        @erro:novoFechamento="mostrarMensagemErro"
        @erro:encerrarFechamento="mostrarMensagemErro"
        @erro:consultarFechamentos="mostrarMensagemErro"
        @success:encerrarFechamento="mostrarMensagemSucesso"
        @toggleDetailModal="toggleDetailModal"
      />
    </v-container>
    <v-snackbar
      v-model="showError"
      color="error"
      bottom>
      {{ this.mensagemErro }}
    </v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="notificacao-cons__snack-success"
      color="success"
      bottom>
      {{ this.mensagemSucesso }}
    </v-snackbar>
  </section>
</template>

<script>
import FechamentoDiario from '@/components/FechamentoDiario/index.vue';
import ModalDetalhesFechamentoDiario from '@/components/FechamentoDiario/ModalDetalhesFechamentoDiario.vue';

export default {
  components: {
    FechamentoDiario,
    ModalDetalhesFechamentoDiario,
  },
  data: () => ({
    showError: false,
    showSuccess: false,
    mensagemSucesso: '',
    mensagemErro: '',
    showModalDetails: false,
  }),
  methods: {
    toggleDetailModal(value) {
      this.showModalDetails = value;
    },
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
    const { msg } = to.params;
    let enter = true;
    if (msg) {
      enter = (vm) => vm.mostrarMensagemSucesso(msg);
    }
    next(enter);
  },
};
</script>
<style lang="sass" scoped>
</style>
