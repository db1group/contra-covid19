<template>
  <div class="px-2">
    <h4 class="primary--text title">
      10. CONTATO COM SUSPEITO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row dense>
        <v-col cols=12>
          <v-checkbox
            class="mt-0"
            label="Sim"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row class="pl-8" dense>
        <v-col cols="12">
          <v-radio-group
            label="Local do contato"
          >
            <v-radio value="DOMICILIO" label="Domicílio"/>
            <v-radio value="UNIDADE_SAUDE" label="Unidade de saúde"/>
            <v-radio value="LOCAL_TRABALHO" label="Local de trabalho"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Nome da pessoa suspeita"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
