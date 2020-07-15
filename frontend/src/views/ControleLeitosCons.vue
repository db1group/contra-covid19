<template>
  <section style="margin-top: 45px;">
    <header-controle-leitos title="Controle de Leitos" :showIcon="false" />
    <controle-leitos-table
      @erro:consultaControleLeitos="mostrarMensagemErro"
      @delete:controleLeitos="mostrarMensagemSucesso"
      @erro:deleteControleLeitos="mostrarMensagemErro"
    />
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="controle-leito-cons__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </section>
</template>

<script>
import HeaderControleLeitos from '@/components/ControleLeitos/HeaderControleLeitos.vue';
import ControleLeitosTable from '@/components/ControleLeitos/ControleLeitosTable.vue';

export default {
  components: {
    HeaderControleLeitos,
    ControleLeitosTable,
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
      this.mensagemErro = msg;
    },
    mostrarMensagemSucesso(msg) {
      this.showSuccess = true;
      this.mensagemSucesso = msg;
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
.controle-leito-cons
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
</style>
