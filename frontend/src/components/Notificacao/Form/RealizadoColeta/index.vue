<template>
  <div class="px-2">
    <h4 class="primary--text title">
      7. REALIZADO COLETA DE MATERIAL PARA DIAGNÓSTICO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12">
          <v-checkbox
            :input-value="realizadaColeta"
            label="Sim"
            hide-details
            @change="updateRealizadaColeta"
          />
          <v-radio-group
            :value="tipoLaboratorio"
            class="pl-8"
            :disabled="!realizadaColeta"
            @change="changeTipoLaboratorio"
          >
            <v-radio :value="1" label="Laboratório Oficial/LACEN"/>
            <v-radio :value="2" label="Laboratório da rede PRIVADA"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ConclusaoAtendimento from '@/entities/ConclusaoAtendimento';

export default {
  props: {
    conclusaoAtendimento: {
      type: ConclusaoAtendimento,
      required: true,
    },
  },
  data: () => ({
    realizadaColeta: false,
    tipoLaboratorio: null,
  }),
  methods: {
    updateRealizadaColeta(realizadaColeta) {
      this.realizadaColeta = realizadaColeta;
      if (!this.realizadaColeta) {
        this.unselectTipoLaboratorio();
      }
    },
    changeTipoLaboratorio(tipoLaboratorio) {
      this.tipoLaboratorio = tipoLaboratorio;
      if (this.tipoLaboratorio === 1) {
        this.selectOficial();
        return;
      }
      if (this.tipoLaboratorio === 2) {
        this.selectRedePrivada();
      }
    },
    selectOficial() {
      this.$emit('update:laboratorioOficial', true);
      this.$emit('update:laboratorioRedePrivada', false);
    },
    selectRedePrivada() {
      this.$emit('update:laboratorioOficial', false);
      this.$emit('update:laboratorioRedePrivada', true);
    },
    unselectTipoLaboratorio() {
      this.tipoLaboratorio = null;
      this.$emit('update:laboratorioOficial', false);
      this.$emit('update:laboratorioRedePrivada', false);
    },
  },
};
</script>
