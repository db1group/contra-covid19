<template>
  <div>
    <h4 class="primary--text title">
      1. IDENTIFICAÇÃO DO CASO SUSPEITO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Nome completo *"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1">Sexo</label>
          <v-radio-group class="mt-0">
            <v-radio label="Masculino" value="M"/>
            <v-radio label="Feminino" value="F"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
};
</script>
