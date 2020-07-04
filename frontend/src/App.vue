<template>
  <v-app class="covid-app">
    <v-content fluid>
      <v-navigation-drawer v-model="isMenuOpen" absolute temporary>
        <main-menu
          :current-route-name="currentRouteName"
          @click="goToPage"
          @logout="executeLogout"
        />
      </v-navigation-drawer>
      <v-app-bar color="white" absolute>
        <div class="d-flex flex-row flex-grow-1 flex-shrink-0 flex-wrap">
          <div>
            <v-btn text fab @click="openMenu">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </div>
          <div class="d-none d-md-flex">
            <unidade-header />
          </div>
          <div class="flex-grow-1 flex-shrink-0">
            <v-btn height="100%" block text @click="goToHomePage">
              <img src="@/assets/notifica-saude.svg" alt="Notifica saúde" />
            </v-btn>
          </div>
          <div>
            <v-btn text height="100%" @click="executeLogout">Sair</v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-spacer></v-spacer>
      <router-view />
    </v-content>
  </v-app>
</template>
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
      this.$router.push({ name: pageName }).catch((err) => {
        if (err.name === 'NavigationDuplicated') return;
        throw err;
      });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
