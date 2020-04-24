<template>
<v-container fluid>
  <v-row justify="space-between" align="center">
    <v-col cols="auto">
      <h4 v-if="showIcon" class="primary--text my-7 m-0 mb-0 display-1">
        <v-btn large icon color="primary" :to="{ name: backRoute }">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{title}}
      </h4>
      <h4 v-if="!showIcon"  class="primary--text my-7 m-0 mb-0 display-1">{{title}}</h4>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    backRoute: {
      type: String,
      default: '',
    },
  },
};
</script>
