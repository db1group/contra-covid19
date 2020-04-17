<template>
<v-container fluid>
  <v-row justify="space-between" align="center">
    <v-col cols="auto">
      <h3 class="primary--text my-7 display-1">
      Notificações
      </h3>
    </v-col>
    <v-col cols="auto">
      <v-btn
        color="primary"
        rounded
        @click="onClick"
        to="/notificacao/cadastro"
      >
      <v-icon>mdi-plus</v-icon> Cadastrar
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
