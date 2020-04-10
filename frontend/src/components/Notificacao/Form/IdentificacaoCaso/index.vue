<template>
  <div class="px-2">
    <h4 class="primary--text title">
      1. IDENTIFICAÇÃO DO CASO SUSPEITO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <dados-pessoais/>
      <endereco/>
      <contato/>
    </v-container>
  </div>
</template>
<script>
import DadosPessoais from './DadosPessoais.vue';
import Endereco from './Endereco.vue';
import Contato from './Contato.vue';

const MUNICIPIOS = ['Maringá', 'Sarandi', 'Paiçandu'];

export default {
  components: {
    DadosPessoais,
    Endereco,
    Contato,
  },
  data: () => ({
    municipios: MUNICIPIOS,
  }),
};
</script>
