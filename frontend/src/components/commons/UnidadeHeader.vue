<template>
  <v-row class="unidade-header" align="center" dense>
    <img
      src="@/assets/icon-covid.png"
      alt="Notifica Saúde"
      class="mr-2"
    />
    <v-col
      cols="10"
    >
      <v-row dense>
        <v-col cols="12">
          <span class="font-weight-bold">Unidade Notificante</span>
        </v-col>
        <v-col cols="12">
          <div class="body-2 unidade-header__full-name">
            {{ fullName }}
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="sass" scoped>
@import ~@/styles/mobileFirst
.unidade-header
  min-width: 350px
  &__full-name
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
<script>
import KeycloakService from '@/services/KeycloakService';

export default {
  computed: {
    fullName() {
      return KeycloakService.tokenParsed.name;
    },
  },
};
</script>
