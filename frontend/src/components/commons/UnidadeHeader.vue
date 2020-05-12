<template>
  <v-row class="unidade-header" align="center" dense>
    <img
      src="@/assets/icon-notification.svg"
      alt="Notifica Saúde"
      class="mr-2 unidade-header__logo"
    />
    <v-col
      class="unidade-header__info"
    >
      <v-row dense>
        <v-col cols="12">
          <span class="font-weight-bold">Unidade Notificante</span>
        </v-col>
        <v-col cols="12">
          <div class="body-2 unidade-header__full-name">
            {{ fullName }} Amet amet labore id voluptate officia nostrud laboris eu enim nisi cupidatat.
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style lang="sass" scoped>
@import ~@/styles/mobileFirst
.unidade-header
  &__logo
    width: 40px
  &__info
    display: none
    width: calc(100% - 48px)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  &__full-name
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  +media-min-sm
    &__info
      display: block
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
