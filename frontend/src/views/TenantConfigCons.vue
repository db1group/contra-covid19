<template>
  <section style="margin-top: 45px;">
    <header-title
      title="Configuração do Fechamento"
      :showIcon="false"
      :showCadButton="true"
      cadRoute="tenant-config-form"
      :cadSecretaria="false"
    />
    <tenant-table
      @erro:consultaUsuario="mostrarMensagemErro"
      @delete:usuario="mostrarMensagemSucesso"
      @erro:deleteUsuario="mostrarMensagemErro"
    />
    <v-snackbar v-model="showError" color="error" bottom>{{ this.mensagemErro }}</v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="tenant-cons__snack-success"
      color="success"
      bottom
    >{{ this.mensagemSucesso }}</v-snackbar>
  </section>
</template>

<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import TenantTable from '@/components/TenantConfig/ConfigCons.vue';
import keycloak from '@/services/KeycloakService';

export default {
  components: {
    HeaderTitle,
    TenantTable,
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
    if (!keycloak.realmAccess.roles.includes('SUPERVISOR')) {
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
.tenant-cons
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
</style>
