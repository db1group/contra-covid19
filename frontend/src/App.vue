<template>
  <v-app class="covid-app">
    <v-content fluid>
      <v-navigation-drawer
        v-model="isMenuOpen"
        absolute
        temporary
      >
        <main-menu
          :current-route-name="currentRouteName"
          @click="goToPage"
          @logout="executeLogout"
        />
      </v-navigation-drawer>
      <v-app-bar color="white" absolute>
        <v-row class="fill-height" dense>
          <v-col cols="auto" class="py-0 fill-height">
            <v-btn
              height="100%"
              text
              fab
              @click="openMenu"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
          <v-col class="covid-app__unidade fill-height py-0 pl-2" md="3">
            <unidade-header/>
          </v-col>
          <v-col cols="8" md="6" class="py-0 fill-height">
            <v-btn
              block
              height="100%"
              text
              @click="goToHomePage"
            >
              <img src="@/assets/notifica-saude.svg" alt="Notifica saúde"/>
            </v-btn>
          </v-col>
          <v-row class="fill-height py-0 pr-2" justify="end">
            <v-btn
              text
              height="100%"
              @click="executeLogout"
            >
              Sair
            </v-btn>
          </v-row>
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
  &__unidade
    display: none
  +media-min-md
    &__unidade
      display: block
</style>
<script>
import keycloak from '@/services/KeycloakService';
import UnidadeHeader from '@/components/commons/UnidadeHeader.vue';
import MainMenu from '@/components/MainMenu/index.vue';

export default {
  name: 'App',
  components: {
    UnidadeHeader,
    MainMenu,
  },
  data: () => ({
    isMenuOpen: false,
  }),
  methods: {
    executeLogout() {
      const { origin } = window.location;
      const homePage = this.$router.resolve({ name: 'home-page' }).href;
      keycloak.logout({ redirectUri: `${origin}${homePage}` });
    },
    goToHomePage() {
      this.$router.push({ name: 'home-page' });
    },
    openMenu() {
      this.isMenuOpen = true;
    },
    goToPage(pageName) {
      this.$router.push({ name: pageName });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
