<template>
  <section style="margin-top: 45px;">
    <!-- <header-controle-leito-perfil title="Controle de Leito Perfil" :showIcon="true" /> -->
    <controle-leito-perfil-table
      :id="controleLeitoId"
      :controleLeito="controleLeito"
      @erro:consultaControleLeitosPerfis="mostrarMensagemErro"
      @delete:controleLeitoPerfil="mostrarMensagemSucesso"
      @erro:deleteControleLeitoPerfil="mostrarMensagemErro"
    />
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="controle-leito-perfil__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </section>
</template>

<script>
import ControleLeitoPerfilTable from '@/components/ControleLeitoPerfil/ControleLeitoPerfilTable.vue';

export default {
  components: {
    // HeaderControleLeitoPerfil,
    ControleLeitoPerfilTable,
  },
  data: () => ({
    showError: false,
    showSuccess: false,
    mensagemSucesso: '',
    mensagemErro: '',
    controleLeitoId: null,
    controleLeito: null,
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
    verPerfil(id, controleLeito) {
      this.controleLeitoId = id;
      this.controleLeito = controleLeito;
    },
  },
  beforeRouteEnter(to, from, next) {
    const { id, controleLeito } = to.params;
    let enter = true;
    enter = (vm) => vm.verPerfil(id, controleLeito);
    next(enter);
  },
};
</script>
<style lang="sass" scoped>
.controle-leito-perfil
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
</style>
