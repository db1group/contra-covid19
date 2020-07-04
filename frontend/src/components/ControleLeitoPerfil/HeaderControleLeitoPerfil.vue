<template>
  <v-container fluid>
    <v-row justify="space-between" align="center">
      <v-col cols="auto">
        <h4 class="primary--text my-7 m-0 mb-0 display-1">Controle de Leito Perfil</h4>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import keycloak from '@/services/KeycloakService';

export default {
  computed: {
    isSecretariaSaude() {
      return keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    },
  },
};
</script>
