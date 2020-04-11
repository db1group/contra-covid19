<template>
  <div class="px-2">
    <h4 class="primary--text font-weight-medium title">
      1. IDENTIFICAÇÃO DO CASO SUSPEITO
    </h4>
    <dados-pessoais/>
    <endereco/>
    <contato/>
  </div>
</template>
<script>
import DadosPessoais from './DadosPessoais.vue';
import Endereco from './Endereco.vue';
import Contato from './Contato.vue';

export default {
  components: {
    DadosPessoais,
    Endereco,
    Contato,
  },
};
</script>
