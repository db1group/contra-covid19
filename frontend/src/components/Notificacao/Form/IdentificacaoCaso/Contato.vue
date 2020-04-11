<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-text-field
          label="Telefone 1 *"
          v-mask="'(##) #########'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-text-field
          label="Telefone 2"
          v-mask="'(##) #########'"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
};
</script>
