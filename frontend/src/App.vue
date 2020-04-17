<template>
  <v-app class="covid-app">
    <v-content>
      <v-app-bar color="white" absolute>
        <v-spacer></v-spacer>

         <v-tabs>
          <v-spacer></v-spacer>
          <v-tab to="/">Notificações</v-tab>
          <v-tab>Relatório</v-tab>
        </v-tabs>

        <v-spacer></v-spacer>

        <v-btn text>
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

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
