<template>
  <v-app class="covid-app">
    <v-content fluid>
      <v-app-bar color="white" absolute>
        <unidade-header />
        <v-container fluid>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <img src="@/assets/notifica-saude.png" alt="Notifica saúde" />
            </v-col>
          </v-row>
        </v-container>
        <v-tabs fixed-tabs>
          <v-tab to="/">Notificações</v-tab>
          <v-tab>Relatório</v-tab>
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
  .v-application.covid-app
    background-color: #FBF8FF
</style>
<script>
import UnidadeHeader from '@/components/commons/UnidadeHeader.vue';

export default {
  name: 'App',
  components: {
    UnidadeHeader,
  },
  data: () => ({
  }),
  methods: {
    executeLogout() {
      this.$keycloak.logoutFn();
    },
  },
};
</script>
