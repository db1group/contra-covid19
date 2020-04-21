<template>
  <base-page class="home-page">
    <v-row>
      <v-col>
        <h1 class="text-center primary--text text--darken-1 display-3">
          Notificações Covid-19
        </h1>
      </v-col>
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
          <v-icon class="mr-2">mdi-magnify</v-icon>
          Consultar notificações
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
          <v-icon class="mr-2">mdi-plus</v-icon>
          Nova notificação
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

export default {
  components: { BasePage },
};
</script>
