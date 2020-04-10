<template>
  <section>
    <h3 class="primary--text my-7 display-1 text-center">
      Cadastro de notificação
    </h3>
    <base-page>
      <identificacao-caso/>
      <sinais-e-sintomas/>
      <comorbidades/>
    </base-page>
  </section>
</template>

<script>
import BasePage from '@/components/commons/BasePage.vue';
import IdentificacaoCaso from '@/components/Notificacao/Form/IdentificacaoCaso/index.vue';
import SinaisESintomas from '@/components/Notificacao/Form/SinaisESintomas/index.vue';
import Comorbidades from '@/components/Notificacao/Form/Comorbidades/index.vue';

export default {
  components: {
    BasePage,
    IdentificacaoCaso,
    SinaisESintomas,
    Comorbidades,
  },
};
</script>
