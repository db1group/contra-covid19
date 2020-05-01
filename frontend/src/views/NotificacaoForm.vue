<template>
  <section style="margin-top: 75px;">
    <base-page>
      <h3 class="primary--text my-7 display-1">
        <v-btn large icon color="primary" :to="{ name: 'notificacao-cons' }">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{title}}
      </h3>
      <v-form ref="form">
        <identificacao-notificante
          :notificacao="notificacao"
          @update:unidadeSaudeId="updateUnidadeSaude"
          @update:nomeNotificador="updateNomeNotificador"
          @update:profissaoId="updateProfissaoId"
          :disabled="disableFields"
        />
        <vinculo-epidemiologico
          :vinculo-epidemiologico="notificacao.vinculoEpidemiologico"
          @update:situacao1="updateVinculoEpidemiologico('situacao1', $event)"
          @update:situacao2="updateVinculoEpidemiologico('situacao2', $event)"
          @update:nome="updateVinculoEpidemiologico('nome', $event)"
          :disabled="disableFields"
        />
        <identificacao-caso
          :data-hora-notificacao="notificacao.dataHoraNotificacao"
          :suspeito="notificacao.suspeito"
          @update:dataHoraNotificacao="updateDataHoraNotificacao"
          @update:tipoDocumento="updateSuspeito('tipoDocumento', $event)"
          @update:numeroDocumento="updateSuspeito('numeroDocumento', $event)"
          @update:nome="updateSuspeito('nome', $event)"
          @update:nomeDaMae="updateSuspeito('nomeDaMae', $event)"
          @update:sexo="updateSuspeito('sexo', $event)"
          @update:gestante="updateSuspeito('gestante', $event)"
          @update:racaCor="updateSuspeito('racaCor', $event)"
          @update:dataDeNascimento="updateSuspeito('dataDeNascimento', $event)"
          @update:cep="updateSuspeito('cep', $event)"
          @update:endereco="updateSuspeito('endereco', $event)"
          @update:numero="updateSuspeito('numero', $event)"
          @update:municipioId="updateSuspeito('municipioId', $event)"
          @update:bairroId="updateSuspeito('bairroId', $event)"
          @update:telefoneResidencial="updateSuspeito('telefoneResidencial', $event)"
          @update:telefoneCelular="updateSuspeito('telefoneCelular', $event)"
          @update:telefoneContato="updateSuspeito('telefoneContato', $event)"
          @update:ocupacao="updateSuspeito('ocupacaoId', $event)"
          @update:descricaoOcupacao="updateSuspeito('ocupacao', $event)"
          @update:complemento="updateSuspeito('complemento', $event)"
          @update:tipoClassificacaoPessoa="updateSuspeito('tipoClassificacaoPessoa', $event)"
          :disabled="disableFields"
        />
        <sinais-e-sintomas
          :sintomatico="notificacao.sintomatico"
          :data-inicio-dos-sintomas="notificacao.dataInicioDosSintomas"
          :sintomas="notificacao.sintomas"
          @update:sintomatico="updateSintomatico"
          @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
          @update:febreAferidaReferida="updateSintoma('febreAferidaReferida', $event)"
          @update:temperaturaFebre="updateSintoma('temperaturaFebre', $event)"
          @update:congestaoNasal="updateSintoma('congestaoNasal', $event)"
          @update:sintomaCoriza="updateSintoma('coriza', $event)"
          @update:sintomaTosse="updateSintoma('tosse', $event)"
          @update:sintomaDorDeGarganta="updateSintoma('dorDeGarganta', $event)"
          @update:sintomaMialgia="updateSintoma('mialgia', $event)"
          @update:escarro="updateSintoma('escarro', $event)"
          @update:sibilo="updateSintoma('sibilo', $event)"
          @update:batimentoAsasNasais="updateSintoma('batimentoAsasNasais', $event)"
          @update:dispneia="updateSintoma('dispneia', $event)"
          @update:taquipneia="updateSintoma('taquipneia', $event)"
          @update:saturacaoDeOximetriaDePulso="updateSintoma('saturacaoDeOximetriaDePulso', $event)"
          @update:cianoseCentral="updateSintoma('cianoseCentral', $event)"
          @update:diminuicaoDePulsoPeriferico="updateSintoma('diminuicaoDePulsoPeriferico', $event)"
          @update:hipotensao="updateSintoma('hipotensao', $event)"
          @update:tiragemIntercostal="updateSintoma('tiragemIntercostal', $event)"
          @update:diarreia="updateSintoma('diarreia', $event)"
          @update:cefaleia="updateSintoma('cefaleia', $event)"
          @update:nauseaVomito="updateSintoma('nauseaVomito', $event)"
          @update:adinamiaFraqueza="updateSintoma('adinamiaFraqueza', $event)"
          @update:artralgia="updateSintoma('artralgia', $event)"
          @update:calafrios="updateSintoma('calafrios', $event)"
          @update:conjuntivite="updateSintoma('conjuntivite', $event)"
          @update:dificuldadeDeglutir="updateSintoma('dificuldadeDeglutir', $event)"
          @update:gangliosLinfaticos="updateSintoma('gangliosLinfaticos', $event)"
          @update:irritabilidadeOuConfusao="updateSintoma('irritabilidadeOuConfusao', $event)"
          @update:manchasVermelhas="updateSintoma('manchasVermelhas', $event)"
          @update:outrosSintomas="updateSintoma('outros', $event)"
          :disabled="disableFields"
        />
        <exames-imagem
          :realizouExamesImagem="notificacao.realizouExamesImagem"
          :examesImagem="notificacao.examesImagem"
          @update:realizouExamesImagem="updateRealizouExamesImagem"
          @update:realizouOutroRaioTorax="updateExameImagem('realizouOutroRaioTorax', $event)"
          @update:raioNormal="updateExameImagem('raioNormal', $event)"
          @update:raioInfiltradoIntersticial="updateExameImagem('raioInfiltradoIntersticial', $event)"
          @update:raioConsolidacao="updateExameImagem('raioConsolidacao', $event)"
          @update:raioMisto="updateExameImagem('raioMisto', $event)"
          @update:raioOutro="updateExameImagem('raioOutro', $event)"
          @update:tomografiaNormal="updateExameImagem('tomografiaNormal', $event)"
          @update:tomografiaVidroFoscoPredominioPerifericoBasal="
          updateExameImagem('tomografiaVidroFoscoPredominioPerifericoBasal', $event)"
          @update:tomografiaAusenciaDerramePleural="
          updateExameImagem('tomografiaAusenciaDerramePleural', $event)"
          @update:tomografiaAusenciaLinfonodoMediastenal="
          updateExameImagem('tomografiaAusenciaLinfonodoMediastenal', $event)"
          @update:tomografiaOutro="updateExameImagem('tomografiaOutro', $event)"
          :disabled="disableFields"
        />
        <comorbidades
          :comorbidades="notificacao.comorbidades"
          @update:puerperaAte45DiasDoParto="updateComorbidade('puerperaAte45DiasDoParto', $event)"
          @update:doencaNeurologicaCronica="updateComorbidade('doencaNeurologicaCronica', $event)"
          @update:sindromeDeDown="updateComorbidade('sindromeDeDown', $event)"
          @update:doencaRenalCronica="updateComorbidade('doencaRenalCronica', $event)"
          @update:diabetesMellitus="updateComorbidade('diabetesMellitus', $event)"
          @update:doencaHematologicaCronica="updateComorbidade('doencaHematologicaCronica', $event)"
          @update:imunodeficiencia="updateComorbidade('imunodeficiencia', $event)"
          @update:asma="updateComorbidade('asma', $event)"
          @update:doencaCardioVascularCronica="updateComorbidade('doencaCardioVascularCronica', $event)"
          @update:outraPneumopatiaCronica="updateComorbidade('outraPneumopatiaCronica', $event)"
          @update:doencaHepaticaCronica="updateComorbidade('doencaHepaticaCronica', $event)"
          @update:obesidade="updateComorbidade('obesidade', $event)"
          @update:hipertensao="updateComorbidade('hipertensao', $event)"
          @update:infeccaoHIV="updateComorbidade('infeccaoHIV', $event)"
          @update:neoplasia="updateComorbidade('neoplasia', $event)"
          @update:tabagismo="updateComorbidade('tabagismo', $event)"
          @update:outros="updateComorbidade('outros', $event)"
          :disabled="disableFields"
        />
        <informacoes-complementares
          :informacoes-complementares="notificacao.informacaoComplementar"
          @update:tamiflu="updateInformacaoComplementar('tamiflu', $event)"
          @update:hidroxicloroquina="updateInformacaoComplementar('hidroxicloroquina', $event)"
          @update:nomeMedicamento="updateInformacaoComplementar('nomeMedicamento', $event)"
          :disabled="disableFields"
        />
        <realizado-coleta
          :conclusao-atendimento="notificacao.conclusaoAtendimento"
          @update:coletaMaterialParaDiagnostico="updateConclusaoAtendimento('coletaMaterialParaDiagnostico', $event)"
          @update:tipoLaboratorio="updateConclusaoAtendimento('tipoLaboratorio', $event)"
          @update:nomeLaboratorioEnvioMaterial="updateConclusaoAtendimento('nomeLaboratorioEnvioMaterial', $event)"
          @update:dataDaColeta="updateConclusaoAtendimento('dataDaColeta', $event)"
          @update:metodoDeExame="updateConclusaoAtendimento('metodoDeExame', $event)"
          :disabled="disableFields"
        />
        <historico-de-viagem
          :informacoes-complementares="notificacao.informacaoComplementar"
          @update:historicoDeViagem="updateInformacaoComplementar('historicoDeViagem', $event)"
          @update:dataDaViagem="updateInformacaoComplementar('dataDaViagem', $event)"
          @update:localDaViagem="updateInformacaoComplementar('localDaViagem', $event)"
          :disabled="disableFields"
        />
        <contato-com-suspeito-ou-confirmado
          :notificacao="notificacao"
          @update:tipoDeContatoComCaso="updateTipoDeContatoComCaso"
          @update:tipoDeLocalDoCaso="updateTipoDeLocalDoCaso"
          @update:nomeDoCaso="updateNomeDoCaso"
          :disabled="disableFields"
        />
        <outras-informacoes
          :informacoes-complementares="notificacao.informacaoComplementar"
          @update:recebeuVacinaDaGripeNosUltimosDozeMeses="
            updateInformacaoComplementar('recebeuVacinaDaGripeNosUltimosDozeMeses', $event)
          "
          :disabled="disableFields"
        />
        <conclusao-atendimento
          :conclusao-atendimento="notificacao.conclusaoAtendimento"
          @update:situacaoNoMomentoDaNotificacao="updateConclusaoAtendimento('situacaoNoMomentoDaNotificacao', $event)"
          :disabled="disableFields"
        />
        <observacoes
          v-model="notificacao.observacoes"
          :disabled="disableFields" />
      </v-form>
      <botao-enviar v-if="stateForm !== 'VIEW'" @click="send" />
      <v-snackbar v-model="showError" color="error" bottom>{{ errorMessage }}</v-snackbar>
      <v-snackbar
        v-model="showAlert"
        color="warning"
        bottom
      >Algum dos campos do formulário possui alguma pendência</v-snackbar>
      <v-snackbar v-model="showSuccess" color="success" bottom>Notificação enviada com sucesso.</v-snackbar>
    </base-page>
  </section>
</template>
<script>
import NotificacaoService from '@/services/NotificacaoService';
import BasePage from '@/components/commons/BasePage.vue';
import IdentificacaoNotificante from '@/components/Notificacao/Form/IdentificacaoNotificante/index.vue';
import VinculoEpidemiologico from '@/components/Notificacao/Form/VinculoEpidemiologico/index.vue';
import IdentificacaoCaso from '@/components/Notificacao/Form/IdentificacaoCaso/index.vue';
import SinaisESintomas from '@/components/Notificacao/Form/SinaisESintomas/index.vue';
import ExamesImagem from '@/components/Notificacao/Form/ExamesImagem/index.vue';
import Comorbidades from '@/components/Notificacao/Form/Comorbidades/index.vue';
import InformacoesComplementares from '@/components/Notificacao/Form/InformacoesComplementares/index.vue';
import ConclusaoAtendimento from '@/components/Notificacao/Form/ConclusaoAtendimento/index.vue';
import RealizadoColeta from '@/components/Notificacao/Form/RealizadoColeta/index.vue';
import ContatoComSuspeitoOuConfirmado from '@/components/Notificacao/Form/ContatoComSuspeitoOuConfirmado/index.vue';
import HistoricoDeViagem from '@/components/Notificacao/Form/HistoricoDeViagem/index.vue';
import OutrasInformacoes from '@/components/Notificacao/Form/OutrasInformacoes/index.vue';
import Observacoes from '@/components/Notificacao/Form/Observacoes/index.vue';
import BotaoEnviar from '@/components/Notificacao/Form/BotaoEnviar.vue';
import Notificacao from '@/entities/Notificacao';

const StateForm = {
  NEW: 'NEW',
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export default {
  components: {
    BasePage,
    IdentificacaoNotificante,
    VinculoEpidemiologico,
    IdentificacaoCaso,
    SinaisESintomas,
    ExamesImagem,
    Comorbidades,
    InformacoesComplementares,
    ConclusaoAtendimento,
    RealizadoColeta,
    ContatoComSuspeitoOuConfirmado,
    HistoricoDeViagem,
    OutrasInformacoes,
    Observacoes,
    BotaoEnviar,
  },
  data: () => ({
    notificacao: new Notificacao(),
    showError: false,
    showAlert: false,
    showSuccess: false,
    errorMessage: '',
    stateForm: StateForm.NEW,
  }),
  computed: {
    title() {
      switch (this.stateForm) {
        case StateForm.VIEW: return 'Visualizar notificação';
        case StateForm.EDIT: return 'Editar notificação';
        default: return 'Cadastrar notificação';
      }
    },
    disableFields() {
      return this.stateForm === StateForm.VIEW;
    },
  },
  methods: {
    updateUnidadeSaude(unidadeSaudeId) {
      this.notificacao.unidadeSaudeId = unidadeSaudeId;
    },
    updateNomeNotificador(nomeNotificador) {
      this.notificacao.nomeNotificador = nomeNotificador;
    },
    updateProfissaoId(profissaoId) {
      this.notificacao.profissaoId = profissaoId;
    },
    updateVinculoEpidemiologico(campo, valor) {
      this.notificacao.vinculoEpidemiologico[campo] = valor;
    },
    updateDataHoraNotificacao(dataHoraNotificacao) {
      this.notificacao.dataHoraNotificacao = dataHoraNotificacao;
    },
    updateSintomatico(sintomatico) {
      this.notificacao.sintomatico = sintomatico;
    },
    updateRealizouExamesImagem(realizouExamesImagem) {
      this.notificacao.realizouExamesImagem = realizouExamesImagem;
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.notificacao.dataInicioDosSintomas = dataInicioDosSintomas;
    },
    updateTipoDeContatoComCaso(tipoDeContatoComCaso) {
      this.notificacao.tipoDeContatoComCaso = tipoDeContatoComCaso;
    },
    updateTipoDeLocalDoCaso(tipoDeLocalDoCaso) {
      this.notificacao.tipoDeLocalDoCaso = tipoDeLocalDoCaso;
    },
    updateNomeDoCaso(nomeDoCaso) {
      this.notificacao.nomeDoCaso = nomeDoCaso;
    },
    updateSuspeito(campo, valor) {
      this.notificacao.suspeito[campo] = valor;
    },
    updateSintoma(campo, valor) {
      this.notificacao.sintomas[campo] = valor;
    },
    updateExameImagem(campo, valor) {
      this.notificacao.examesImagem[campo] = valor;
    },
    updateComorbidade(campo, valor) {
      this.notificacao.comorbidades[campo] = valor;
    },
    updateInformacaoComplementar(campo, valor) {
      this.notificacao.informacaoComplementar[campo] = valor;
    },
    updateConclusaoAtendimento(campo, valor) {
      this.notificacao.conclusaoAtendimento[campo] = valor;
    },
    send() {
      if (this.stateForm === StateForm.VIEW) return;
      if (this.$refs.form.validate()) {
        const requestNotificacao = this.notificacao.toRequestBody();
        NotificacaoService.save(requestNotificacao).then(() => {
          this.showSuccess = true;
          setTimeout(() => {
            this.$router.go();
          }, 500);
        }).catch(({ response }) => {
          this.showError = true;
          this.errorMessage = response.data.error;
        });
      } else {
        this.showAlert = true;
      }
    },
    visualizarNotificacao(notificacaoId) {
      this.stateForm = StateForm.VIEW;
      this.buscarNotiticacao(notificacaoId);
    },
    editarNotificacao(notificacaoId) {
      this.stateForm = StateForm.EDIT;
      this.buscarNotiticacao(notificacaoId);
    },
    buscarNotiticacao(notificacaoId) {
      NotificacaoService.findById(notificacaoId)
        .then(({ data }) => {
          this.notificacao = new Notificacao(data);
        })
        .catch(({ response }) => {
          this.showError = true;
          this.errorMessage = response.data.error;
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    const { id, edit } = to.params;
    let enter = true;
    if (edit) {
      enter = (vm) => vm.editarNotificacao(id);
    } else if (id) {
      enter = (vm) => vm.visualizarNotificacao(id);
    }
    next(enter);
  },
};
</script>
