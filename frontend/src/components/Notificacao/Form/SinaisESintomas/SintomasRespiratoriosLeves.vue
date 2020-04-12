<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="primary--text body-1 font-weight-bold">
          Sintomas respiratórios LEVES
        </label>
        <v-checkbox
          :value="sintomas.coriza"
          label="CORIZA"
          hide-details
          @change="updateCoriza"
        />
        <v-checkbox
          :value="sintomas.tosseSeca"
          label="TOSSE SECA"
          hide-details
          @change="updateTosseSeca"
        />
        <v-checkbox
          :value="sintomas.dorDeGarganta"
          label="DOR DE GARGANTA"
          hide-details
          @change="updateDorDeGarganta"
        />
        <v-checkbox
          :value="sintomas.mialgia"
          label="MIALGIA"
          hide-details
          @change="updateMialgia"
        />
        <v-checkbox
          label="FEBRE BAIXA (até 37,8)"
          hide-details
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
