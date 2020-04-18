<template>
<v-container fluid>
  <v-row justify="space-between" align="center">
    <v-col cols="auto">
      <h4 class="primary--text my-7 m-0 mb-0 display-1">{{title}}</h4>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true, // ou default: '', é importante sempre obrigar a passar um valor, ou informar um default
    },
  },
};
</script>
