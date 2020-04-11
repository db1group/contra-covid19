<template>
  <div class="px-2">
    <h4 class="primary--text title">
      4. INFORMAÇÕES COMPLEMENTARES
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Uso de medicação antitérmica e/ou analgésica e/ou anti-inflamatório?
          </label>
          <v-checkbox
            label="Sim"
            hide-details
          />
          <v-text-field
            class="pl-8"
            label="Especifique"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Uso de medicação Antiviral?
          </label>
          <v-checkbox
            label="Sim"
            hide-details
          />
          <v-text-field
            class="pl-8"
            label="Especifique"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <label class="primary--text body-1 font-weight-bold">
            Histórico de viagem?
          </label>
          <v-checkbox
            label="Sim"
            hide-details
          />
          <v-text-field
            class="pl-8"
            label="Data da viagem *"
            append-icon="mdi-calendar-blank"
            v-mask="'##/##/####'"
          />
          <v-text-field
            class="pl-8"
            label="Local da viagem *"
            append-icon="mdi-map-marker"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="primary--text body-1 font-weight-bold">
            Recebeu vacina contra Gripe nos últimos doze meses?
          </label>
          <v-checkbox
            label="Sim"
            hide-details
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
};
</script>
