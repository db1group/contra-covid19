<template>
  <div class="px-2">
    <h4 class="primary--text title">
      2. SINAIS E SINTOMAS
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <sintomas-gerais/>
      <sintomas-respiratorios-leves/>
      <sintomas-respiratorios-graves/>
      <outros-sintomas/>
    </v-container>
  </div>
</template>
<script>
import SintomasGerais from './SintomasGerais.vue';
import SintomasRespiratoriosLeves from './SintomasRespiratoriosLeves.vue';
import SintomasRespiratoriosGraves from './SintomasRespiratoriosGraves.vue';
import OutrosSintomas from './OutrosSintomas.vue';

export default {
  components: {
    SintomasGerais,
    SintomasRespiratoriosLeves,
    SintomasRespiratoriosGraves,
    OutrosSintomas,
  },
};
</script>
