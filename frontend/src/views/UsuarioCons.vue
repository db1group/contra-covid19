<template>
  <section style="margin-top: 45px;">
    <header-title title="Usuários" :showIcon="false" :showCadButton="true" cadRoute="usuario-form" />
    <usuario-table
      @erro:consultaUsuario="mostrarMensagemErro"
      @delete:usuario="mostrarMensagemSucesso"
      @erro:deleteUsuario="mostrarMensagemErro"
    />
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="usuario-cons__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </section>
</template>

<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import UsuarioTable from '@/components/Usuario/UsuarioTable.vue';
import keycloak from '@/services/KeycloakService';

export default {
  components: {
    HeaderTitle,
    UsuarioTable,
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
    if (!keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE')) {
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
<style lang="sass" scoped>
.usuario-cons
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
</style>
