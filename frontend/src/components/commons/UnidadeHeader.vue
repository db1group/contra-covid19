<template>
  <v-row class="unidadeHeader" align="center" dense>
    <v-col cols="auto">
      <img src="@/assets/icon-covid.png" alt="Notifica Saúde" />
    </v-col>
    <v-col cols="auto">
      <v-row dense>
        <v-col cols="auto">
          <span class="font-weight-bold">Unidade Notificante</span>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="auto">
          <span class="body-2">{{this.$keycloak.fullName}}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="sass" scoped>
  .unidadeHeader
    min-width: 350px
</style>
