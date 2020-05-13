<template>
  <v-list>
    <v-list-item-group :value="currentRouteName" color="primary">
      <v-subheader>Home</v-subheader>
      <v-list-item value="home-page" @click="onClick('home-page')">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Página inicial</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-subheader>Notificações</v-subheader>
      <v-list-item value="notificacao-cons" @click="onClick('notificacao-cons')">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Consultar Notificações</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item value="notificacao-form" @click="onClick('notificacao-form')">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Nova notificação</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-subheader>Ações</v-subheader>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-exit-run</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  props: {
    currentRouteName: {
      type: String,
      default: null,
    },
  },
  methods: {
    onClick(routeName) {
      this.$emit('click', routeName);
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>
