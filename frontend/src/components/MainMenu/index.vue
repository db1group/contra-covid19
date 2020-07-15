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
      <v-list-item v-if="isSecretariaSaude" value="exportar" @click="onClick('exportar')">
        <v-list-item-icon>
          <v-icon>mdi-download</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Exportar</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item value="unidades-saude-cons" @click="onClick('unidades-saude-cons')">
        <v-list-item-icon>
          <v-icon>mdi-stethoscope</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Unidades de Saúde</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="isSecretariaSaude" value="usuario-cons" @click="onClick('usuario-cons')">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        value="controle-leitos-cons"
        @click="onClick('controle-leitos-cons')"
      >
        <v-list-item-icon>
          <v-icon>mdi-bed</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Controle de Leitos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="isUserFechamento"
        value="fechamento-diario"
        @click="onClick('fechamento-diario')"
      >
        <v-list-item-icon>
          <v-icon>mdi-close-box-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Fechamento</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="isSecretariaSaude"
        value="envio-secretaria"
        @click="onClick('envio-secretaria')"
      >
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Envio para Secretaria</v-list-item-title>
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
import keycloak from '@/services/KeycloakService';

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
  computed: {
    isSecretariaSaude() {
      return keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    },
    isUserFechamento() {
      return keycloak.realmAccess.roles.includes('FECHAMENTO');
    },
  },
};
</script>
