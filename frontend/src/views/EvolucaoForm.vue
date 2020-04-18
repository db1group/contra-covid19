<template>
 <section style="margin-top: 35px;">
    <header-title title="Evolução dos pacientes" />
    <v-container fluid>
      <v-row justify="space-around" align="center">
        <v-col cols="auto">
          <evolucao-form :notificacao-id="notificacaoId" />
        </v-col>
        <v-col cols="auto">
          <evolucao-consulta v-if="evolucao !== null" :evolucao="evolucao" />
        </v-col>
      </v-row>
    </v-container>
 </section>
</template>
<script>
// import NotificacaoService from '@/services/NotificacaoService';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import Evolucao from '@/entities/Evolucao';
import EvolucaoForm from '@/components/Notificacao/Evolucao/Form.vue';
import EvolucaoConsulta from '@/components/Notificacao/Evolucao/Cons.vue';

export default {
  components: {
    HeaderTitle,
    EvolucaoForm,
    EvolucaoConsulta,
  },
  data: () => ({
    evolucao: null,
    notificacaoId: '',
  }),
  created() {
    const { id } = this.$route.params;
    this.notificacaoId = id;
    this.consultarEvolucao();
  },
  methods: {
    consultarEvolucao() {
      // setTimeout(() => this.$router.push('/'), 1500);
      /*
        NotificacaoService.findEvolucao({ id }).then(({ count, data }) => {
          console.log(count, data);
          this.totalEvolucoes = count;
          this.evolucoes = data.map((e) => new NotificacaoEvolucao(e).toRequestBody());
          this.loading = false;
        });
      */
      setTimeout(() => {
        this.evolucao = new Evolucao({
          notificacaoId: this.notificacaoId,
          status: 'ABERTA',
          Pessoa: {
            nome: 'Corey Ekstrom Bothman',
            numeroDocumento: '123.456.789-00',
            telefoneContato: '(44) 12345-6789',
          },
          NotificacaoEvolucaos: [
            {
              id: '1',
              dtEvolucao: '2020-04-18T15:53:01.553Z',
              tpLocal: 'Alta com isolamento domiciliar',
              tpEvolucao: 'Suspeito',
            },
            {
              id: '2',
              dtEvolucao: '2020-04-18T15:53:01.553Z',
              tpLocal: 'Hospitalizado – Leito comum',
              tpEvolucao: 'Confirmado',
            },
            {
              id: '3',
              dtEvolucao: '2020-04-18T15:53:01.553Z',
              tpLocal: 'Hospitalizado – Leito comum',
              tpEvolucao: 'Curado',
            },
            {
              id: '4',
              dtEvolucao: '2020-04-18T15:53:01.553Z',
              tpLocal: 'Alta com isolamento domiciliar',
              tpEvolucao: 'Encerrado',
            },
            {
              id: '5',
              dtEvolucao: '2020-04-18T15:53:01.553Z',
              tpLocal: 'Alta com isolamento domiciliar',
              tpEvolucao: 'Descartado',
            },
            {
              id: '6',
              dtEvolucao: '2020-04-18T15:53:01.553Z',
              tpLocal: 'Hospitalizado - Leito UTI',
              tpEvolucao: 'Óbito',
            },
          ],
        });
      }, 1500);
    },
  },
};
</script>
