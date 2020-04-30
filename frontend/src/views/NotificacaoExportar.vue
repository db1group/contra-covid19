<template>
  <section style="margin-top: 75px;">
    <base-page>
      <v-container fluid>
        <v-row justify="space-between" align="center">
          <!-- <v-form ref="form" class="col-12"> -->
          <v-form ref="form">
            <exportar
              :exportar="exportar"
              @update:dataInicial="updateExportar('dataInicial', $event)"
              @update:dataFinal="updateExportar('dataFinal', $event)"
              @click="send"
            ></exportar>
          </v-form>
          <!-- </v-form> -->
        </v-row>
      </v-container>
    </base-page>
  </section>
</template>
<script>

import BasePage from '@/components/commons/BasePage.vue';
import Exportar from '@/components/Notificacao/Exportar/Index.vue';
import NotificacaoExportar from '@/entities/NotificacaoExportar';
import NotificacaoService from '@/services/NotificacaoService';

export default {
  components: {
    BasePage,
    Exportar,
  },
  data: () => ({
    exportar: new NotificacaoExportar(),
  }),
  methods: {
    updateExportar(campo, valor) {
      this.exportar[campo] = valor;
    },
    send() {
      if (this.$refs.form.validate()) {
        const link = NotificacaoService.getExcelLink(this.exportar);
        if (link) {
          const url = decodeURI(link);
          window.open(url, '_blank');
        }
      }
    },
  },
};
</script>
