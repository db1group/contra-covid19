<template>
  <div class="px-2">
    <h4 class="primary--text title">
      3. COMORBIDADES
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Puérpera até 45 dias do parto"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Doença neurológica crônica"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Síndrome de Down"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Doença renal crônica"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Diabetes Mellitus"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Doença hematológica crônica"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Imunodeficiência/imunodepressão"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Asma"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Doença cardiovascular crônica"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Outra pneumopatia crônica"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Doença hepática crônica"
            hide-details
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            label="Obesidade"
            hide-details
          />
          <v-text-field
            class="pl-8"
            label="IMC"
          />
        </v-col>
        <v-col
          class="comorbidades__outros"
          cols="12"
          md="6"
        >
          <v-checkbox
            label="Outros"
            hide-details
          />
          <v-text-field
            class="pl-8"
            label="Especifique"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="sass" scoped>
@import ~@/styles/mobileFirst
.comorbidades
  +media-min-md
    &__outros
      margin-top: -70px
</style>
