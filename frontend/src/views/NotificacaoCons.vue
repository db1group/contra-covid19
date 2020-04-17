<template>
  <section style="margin-top: 45px;">
    <header-cons></header-cons>
    <notificacao-table></notificacao-table>
    <v-snackbar
      v-model="showError"
      color="error"
      bottom>
      {{ this.mensagemErro }}
    </v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      color="success"
      bottom>
      {{ this.mensagemSucesso }}
    </v-snackbar>
  </section>
</template>

<script>
import HeaderCons from '@/components/Notificacao/Consulta/HeaderCons/index.vue';
import NotificacaoTable from '@/components/Notificacao/Consulta/NotificacaoTable/index.vue';
import Notificacao from '@/entities/Notificacao';

export default {
  components: {
    HeaderCons,
    NotificacaoTable,
  },
  data: () => ({
    notificacao: new Notificacao(),
    showError: false,
    showSuccess: false,
    mensagemSucesso: 'Notificações editadas com sucesso!',
    mensagemErro: 'Ops! Ocorreu um erro ao consultar as notificações.',
  }),
  methods: {
    atualizarMensagemErro() {
    },
    atualizarMensagemSucesso() {
    },
  },
};
</script>
