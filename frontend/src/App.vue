<template>
  <v-app class="covid-app">
    <v-content fluid>
      <v-app-bar color="white" absolute>
        <unidade-header />
        <v-container fluid>
          <v-row
            class="covid-app__logo-container"
            justify="center"
            align="center"
            @click="goToHomePage"
          >
            <v-col cols="auto">
              <img src="@/assets/notifica-saude.png" alt="Notifica saúde" />
            </v-col>
          </v-row>
        </v-container>
        <v-tabs fixed-tabs>
          <v-tab :to="{ name: 'notificacao-cons' }">Notificações</v-tab>
          <!-- <v-tab>Relatório</v-tab> -->
        </v-tabs>
        <v-btn text @click="executeLogout">
          Sair
        </v-btn>
      </v-app-bar>
      <v-spacer></v-spacer>
      <router-view/>
    </v-content>
  </v-app>
</template>
<style lang="sass" scoped>
  .covid-app
    &.v-application
      background-color: #FAFAFA
    &__logo-container
      cursor: pointer
</style>
<script>
import UnidadeHeader from '@/components/commons/UnidadeHeader.vue';

export default {
  name: 'App',
  components: {
    UnidadeHeader,
  },
  methods: {
    executeLogout() {
      const { origin } = window.location;
      const homePage = this.$router.resolve({ name: 'home-page' }).href;
      const url = this.$keycloak.createLogoutUrl({ redirectUri: `${origin}${homePage}` });
      window.location.href = url;
    },
    goToHomePage() {
      this.$router.push({ name: 'home-page' });
    },
  },
};
</script>
