<template>
  <div class="d-flex flex-column ma-2">
    <div class="font-weight-bold truncate-text">Unidade Notificante</div>
    <div class="body-2 truncate-text" :title="fullName">{{ fullName }}</div>
  </div>
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
