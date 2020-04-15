<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">
          Sintomas respiratórios LEVES
        </label>
        <v-checkbox
          :input-value="sintomas.coriza"
          label="CORIZA"
          hide-details
          :disabled="!sintomatico"
          @change="updateCoriza"
        />
        <v-checkbox
          :input-value="sintomas.tosseSeca"
          label="TOSSE SECA"
          hide-details
          :disabled="!sintomatico"
          @change="updateTosseSeca"
        />
        <v-checkbox
          :input-value="sintomas.dorDeGarganta"
          label="DOR DE GARGANTA"
          hide-details
          :disabled="!sintomatico"
          @change="updateDorDeGarganta"
        />
        <v-checkbox
          :input-value="sintomas.mialgia"
          label="MIALGIA"
          hide-details
          :disabled="!sintomatico"
          @change="updateMialgia"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Sintomas from '@/entities/Sintomas';

export default {
  props: {
    sintomas: {
      type: Sintomas,
      required: true,
    },
    sintomatico: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    updateCoriza(coriza) {
      this.$emit('update:coriza', coriza);
    },
    updateTosseSeca(tosseSeca) {
      this.$emit('update:tosseSeca', tosseSeca);
    },
    updateDorDeGarganta(dorDeGarganta) {
      this.$emit('update:dorDeGarganta', dorDeGarganta);
    },
    updateMialgia(mialgia) {
      this.$emit('update:mialgia', mialgia);
    },
  },
};
</script>
