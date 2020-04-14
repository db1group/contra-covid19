<template>
  <div class="px-2">
    <h4 class="primary--text title">
      8. OBSERVAÇÕES
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols=12>
          <v-textarea
            :value="value"
            solo
            @input="input"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  prop: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    },
  },
};
</script>
