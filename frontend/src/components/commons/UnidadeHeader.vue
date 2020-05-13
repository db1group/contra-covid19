<template>
  <v-row class="unidade-header" align="center" dense>
    <v-col class="unidade-header__info">
      <v-row dense>
        <v-col cols="12" class="pb-0">
          <div class="font-weight-bold truncate-text">
            Unidade Notificante
          </div>
        </v-col>
        <v-col cols="12">
          <div class="body-2 truncate-text" :title="fullName">
            {{ fullName }}
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="sass" scoped>
@import ~@/styles/mobileFirst
.truncate-text
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
<script>
import keycloak from '@/services/KeycloakService';

export default {
  computed: {
    fullName() {
      return keycloak.tokenParsed.name;
    },
  },
};
</script>
