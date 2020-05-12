<template>
 <section style="margin-top: 35px;">
    <header-title title="Evolução dos pacientes" back-route="notificacao-cons" />
    <v-container fluid>
      <v-row justify="space-around" align="center">
        <v-col cols="auto">
          <evolucao-form
            :notificacao-id="notificacaoId"
            :data-maxima-permitida="dataMaximaPermitida"
            @error:cadastroEvolucao="mostrarMensagemErro"
          />
        </v-col>
        <v-col cols="auto">
          <evolucao-consulta v-if="evolucao !== null" :evolucao="evolucao" />
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="showError"
      color="error"
      bottom>
      {{ this.mensagemErro }}
    </v-snackbar>
    <v-snackbar
      v-model="showSuccess"
      class="evolucao-form__snack-success"
      color="success"
      bottom>
      {{ this.mensagemSucesso }}
    </v-snackbar>
 </section>
</template>
<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import EvolucaoForm from '@/components/Notificacao/Evolucao/Form.vue';
import EvolucaoConsulta from '@/components/Notificacao/Evolucao/Cons.vue';
import EvolucaoService from '@/services/EvolucaoService';
import keycloak from '@/services/KeycloakService';
import Evolucao from '@/entities/Evolucao';
import DateService from '@/services/DateService';

export default {
  components: {
    HeaderTitle,
    EvolucaoForm,
    EvolucaoConsulta,
  },
  data: () => ({
    evolucao: null,
    notificacaoId: '',
    showError: false,
    mensagemErro: '',
    showSuccess: false,
    mensagemSucesso: '',
    dataMaximaPermitida: '',
  }),
  methods: {
    consultarEvolucao() {
      if (!this.isSecretariaSaude()) {
        this.$router.push({ name: 'notificacao-cons' });
      }
      EvolucaoService.findByNotificacaoId(this.notificacaoId)
        .then(({ data }) => {
          this.evolucao = new Evolucao(data).toRequestBody();
          this.obterDataMaximaPermitida(this.evolucao);
        })
        .catch(() => this.$router.push({ name: 'notificacao-cons' }));
    },
    mostrarMensagemErro(msg) {
      this.showError = true;
      this.mensagemErro = msg;
    },
    obterDataMaximaPermitida(evolucao) {
      if (evolucao.items && evolucao.items.length > 0) {
        const dataHoraDasAtualizacoes = evolucao.items
          .map((x) => DateService.formatStringTypeToDateTypeWithMinutes(x.dataHoraAtualizacao));
        const dataMaxima = new Date(Math.max.apply(null, dataHoraDasAtualizacoes)).toString();
        this.dataMaximaPermitida = DateService.formatDateTypeToStringTypeWithMinutes(dataMaxima);
      }
    },
    isSecretariaSaude() {
      return keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    },
  },
  created() {
    this.notificacaoId = this.$route.params.id;
    this.consultarEvolucao();
  },
};
</script>
<style lang="sass" scoped>
.evolucao-form
  &__snack-success
    &::v-deep .v-snack__content
      justify-content: center
</style>
