<template>
  <v-app class="covid-app">
    <v-content>
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
