<template>
  <v-app class="covid-app">
    <v-content fluid>
      <v-app-bar color="white" absolute :height="64">
        <v-row>
          <v-col cols="2" sm="3">
            <unidade-header/>
          </v-col>
          <v-col cols="8" sm="4">
            <v-btn
              block
              height="100%"
              text
              @click="goToHomePage"
            >
              <img src="@/assets/notifica-saude.svg" alt="Notifica saúde"/>
            </v-btn>
          </v-col>
          <v-col cols="3" class="covid-app__notification-menu">
            <v-tabs
              fixed-tabs
              height="100%"
              class="covid-app__notification-menu-tabs"
            >
              <v-tab :to="{ name: 'notificacao-cons' }">Notificações</v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="2">
            <v-btn
              block
              text
              height="100%"
              @click="executeLogout"
            >
              Sair
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-spacer></v-spacer>
      <router-view />
    </v-content>
  </v-app>
</template>
<style lang="sass" scoped>
@import ~@/styles/mobileFirst
.covid-app
  &.v-application
    background-color: #FAFAFA
  &__notification-menu
    display: none
    &-tabs
      height: calc(100% - 2px)
  +media-min-sm
    &__notification-menu
      display: block
</style>
<script>
import keycloak from '@/services/KeycloakService';
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
      keycloak.logout({ redirectUri: `${origin}${homePage}` });
    },
    goToHomePage() {
      this.$router.push({ name: 'home-page' });
    },
  },
};
</script>
