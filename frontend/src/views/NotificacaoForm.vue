<template>
  <section>
    <h3 class="primary--text my-7 display-1 text-center">
      Cadastro de notificação
    </h3>
    <base-page>
      <identificacao-caso/>
    </base-page>
  </section>
</template>

<script>
import BasePage from '@/components/commons/BasePage.vue';
import IdentificacaoCaso from '@/components/Notificacao/Form/IdentificacaoCaso.vue';

export default {
  components: {
    BasePage,
    IdentificacaoCaso,
  },
};
</script>
