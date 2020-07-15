<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
      <v-col cols="auto">
        <h4 class="primary--text my-7 m-0 mb-0 display-1">Controle de Leitos</h4>
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="mr-2"
          color="primary"
          rounded
          :to="{ name: 'controle-leitos-form' }"
        >
          <v-icon>mdi-plus</v-icon>Cadastrar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
