<template>
 <section style="margin-top: 35px;">
    <header-title title="Evolução dos pacientes" />
    <v-container fluid>
      <v-row justify="space-around" align="center">
        <v-col cols="auto">
          <evolucao-form />
        </v-col>
        <v-col cols="auto">
          <evolucao-consulta />
        </v-col>
      </v-row>
    </v-container>
 </section>
</template>
<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import EvolucaoForm from '@/components/Notificacao/Evolucao/Form.vue';
import EvolucaoConsulta from '@/components/Notificacao/Evolucao/Cons.vue';

export default {
  components: {
    HeaderTitle,
    EvolucaoForm,
    EvolucaoConsulta,
  },
};
</script>
