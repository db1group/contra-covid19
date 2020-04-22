<template>
  <section style="margin-top: 45px;">
    <header-cons />
    <notificacao-table
      @erro:consultaNotificacao="mostrarMensagemErro"
      @delete:notificacao="mostrarMensagemSucesso"
      @erro:deleteNotificacao="mostrarMensagemErro"
      @delete:notificacaoLote="mostrarMensagemSucesso"
      @erro:deleteNotificacaoLote="mostrarMensagemErro"
    />
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
    mensagemSucesso: '',
    mensagemErro: '',
  }),
  methods: {
    mostrarMensagemErro(msg) {
      this.showError = true;
      this.mensagemErro = msg;
    },
    mostrarMensagemSucesso(msg) {
      this.showSuccess = true;
      this.mensagemSucesso = msg;
    },
  },
  beforeRouteEnter(to, from, next) {
    const { msg } = to.params;
    let enter = true;
    if (msg) {
      enter = (vm) => vm.mostrarMensagemSucesso(msg);
    }
    next(enter);
  },
};
</script>
