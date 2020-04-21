<template>
  <div class="px-2">
    <h4 class="primary--text title">
      12. CONCLUSÃO DO ATENDIMENTO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12" sm="10" md="8">
          <v-radio-group
            :value="conclusaoAtendimento.situacaoNoMomentoDaNotificacao"
            @change="updateSituacaoNoMomentoDaNotificacao"
          >
            <template v-slot:label>
              <label class="primary--text body-1 font-weight-bold">
                Situação no momento da notificação
              </label>
            </template>
            <v-radio value="ALTA_ISOLAMENTO_DOMICILIAR" label="Alta com determinação de ISOLAMENTO DOMICILIAR *"/>
            <v-radio value="INTERNAMENTO_LEITO_COMUM" label="Encaminhado para INTERNAMENTO EM LEITO COMUM **"/>
            <v-radio value="INTERNAMENTO_LEITO_UTI" label="Encaminhado para INTERNAMENTO EM LEITO DE UTI **"/>
            <v-radio value="EVOLUCAO_OBITO" label="Evolução para ÓBITO"/>
          </v-radio-group>
          <div v-show="isIsolamentoDomiciliar">
            <p>
              * Para isolamento domiciliar, providenciar preenchimento do termo de consentimento livre e esclarecido e
              entregar orientações de
              <span class="font-weight-bold">
                "Isolamento domiciliar por 14 dias: condutas para pessoas infectadas ou suspeitas de infecção pelo novo
                Coronavírus - Covid 19".
              </span>
            </p>
            <v-btn class="px-1" color="primary" link text>
              Abrir orientações em outra janela
              <v-icon class="ml-3">mdi-open-in-new</v-icon>
            </v-btn>
          </div>
          <p v-show="isInternamento">
            ** Para internamento, manter isolamento hospitalar, utilizar precauções padrão e para gotículas. Quando for
            realizar procedimentos invasivos que possam gerar aerossóis, utilizar precauções para aerossóis.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ConclusaoAtendimento from '@/entities/ConclusaoAtendimento';

export default {
  props: {
    conclusaoAtendimento: {
      type: ConclusaoAtendimento,
      required: true,
    },
  },
  methods: {
    updateSituacaoNoMomentoDaNotificacao(situacaoNoMomentoDaNotificacao) {
      this.$emit('update:situacaoNoMomentoDaNotificacao', situacaoNoMomentoDaNotificacao);
    },
  },
  computed: {
    isIsolamentoDomiciliar() {
      return this.conclusaoAtendimento.situacaoNoMomentoDaNotificacao === 'ALTA_ISOLAMENTO_DOMICILIAR';
    },
    isInternamento() {
      return this.conclusaoAtendimento.situacaoNoMomentoDaNotificacao === 'INTERNAMENTO_LEITO_COMUM'
        || this.conclusaoAtendimento.situacaoNoMomentoDaNotificacao === 'INTERNAMENTO_LEITO_UTI';
    },
  },
};
</script>
