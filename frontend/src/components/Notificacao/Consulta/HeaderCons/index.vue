<template>
<v-container fluid>
  <v-row justify="space-between" align="center">
    <v-col cols="auto">
      <h4 class="primary--text my-7 m-0 mb-0 display-1">Notificações</h4>
    </v-col>
    <v-col cols="auto">
      <v-btn
        color="primary"
        rounded
        :to="{ name: 'notificacao-form' }"
      >
      <v-icon>mdi-plus</v-icon> Cadastrar
      </v-btn>
      <v-btn
        color="primary"
        rounded
        :to="{ name: 'exportar' }"
      >
      <v-icon>mdi-download</v-icon> exportar
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
