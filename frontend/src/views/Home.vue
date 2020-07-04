<template>
  <base-page class="home-page">
    <v-row>
      <v-col>
        <h1 class="text-center primary--text text--darken-1 display-3">Notificações Covid-19</h1>
      </v-col>
    </v-row>

    <h2 class="primary--text text-center mt-6">Meus Dados</h2>
    <div class="d-flex justify-center">
      <div class="d-flex flex-column align-end">
        <div class="primary--text text-h4">
          <h4>Usuário:</h4>
        </div>
        <div class="primary--text">
          <h4>Unidade de Saúde:</h4>
        </div>
      </div>
      <div class="d-flex flex-column ml-3">
        <div>{{ fullName }}</div>
        <div>{{ unidadesSaudeUserLogged }}</div>
      </div>
    </div>

    <v-row>
      <v-col class="text-center"></v-col>
    </v-row>
    <v-row class="mx-1 mx-sm-0">
      <v-col cols="12" md="6">
        <v-btn
          class="title"
          color="primary"
          block
          height="250"
          rounded
          :to="{ name: 'notificacao-cons' }"
        >
          <v-icon class="mr-2">mdi-magnify</v-icon>Consultar notificações
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn
          class="title"
          color="secondary"
          block
          height="250"
          rounded
          :to="{ name: 'notificacao-form' }"
        >
          <v-icon class="mr-2">mdi-plus</v-icon>Nova notificação
        </v-btn>
      </v-col>
    </v-row>
  </base-page>
</template>
<style lang="sass" scoped>
@import ~@/styles/mobileFirst
.home-page
  margin-top: 50px
  +media-min-sm
  margin-top: 200px
  +media-min-md
  margin-top: 250px
</style>
<script>
import BasePage from '@/components/commons/BasePage.vue';
import keycloak from '@/services/KeycloakService';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';

export default {
  components: { BasePage },
  data: () => ({
    unidadesSaudeUserLogged: 'Não há Unidade de Saúde vinculadas a este usuário.',
  }),
  computed: {
    fullName() {
      return keycloak.tokenParsed.name;
    },
  },
  methods: {
    consultarUnidadesSaudeUsuario() {
      UnidadeSaudeService.findByUserEmail(keycloak.tokenParsed.email)
        .then(({ data }) => {
          if (data.length === 0) return;
          const [primeiraUnidade] = data;
          this.unidadesSaudeUserLogged = primeiraUnidade.nome;
        });
    },
  },
  created() {
    this.consultarUnidadesSaudeUsuario();
  },
};
</script>
