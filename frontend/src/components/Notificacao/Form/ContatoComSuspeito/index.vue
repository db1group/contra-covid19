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
            :disabled="disabled"
          />
        </v-col>
      </v-row>
      <v-row class="pl-8" dense>
        <v-col cols="12">
          <v-radio-group
            label="Local do contato"
            :disabled="disabled"
          >
            <v-radio
              v-for="localContato in locaisContato"
              :key="localContato.value"
              :value="localContato.value"
              :label="localContato.label"
            />
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
<script>
import locaisContato from '@/entities/enums/LocaisContato.json';

export default {
  props: {
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    locaisContato,
  }),
};
</script>
