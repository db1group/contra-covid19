<template>
  <v-dialog
    :value="value"
    max-width="500"
    @input="input"
  >
    <v-card>
      <slot/>
      <v-row
        class="mx-2 py-2"
        justify="end"
      >
        <v-btn
          class="mr-2"
          text
          @click="close"
        >
          {{ cancelLabel }}
        </v-btn>
        <v-btn
          text
          :color="confirmColor"
          @click="confirm"
        >
          {{ confirmLabel }}
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    confirmLabel: {
      type: String,
      default: 'Confirmar',
    },
    confirmColor: {
      type: String,
      default: 'success',
    },
    cancelLabel: {
      type: String,
      default: 'Cancelar',
    },
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    close() {
      this.input(false);
    },
    confirm() {
      this.$emit('confirm');
      this.close();
    },
  },
};
</script>
