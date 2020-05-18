<template>
  <div class="px-2">
    <v-container fluid class="pa-0">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="primary" rounded :disabled="disabled" @click="onClick">Enviar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      defaultValue: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
