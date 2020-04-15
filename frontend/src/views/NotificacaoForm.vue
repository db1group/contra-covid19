<template>
  <section>
    <h3 class="primary--text my-7 display-1 text-center">
      Cadastro de notificação
    </h3>
    <base-page>
      <identificacao-caso
        :data-hora-notificacao="notificacao.dataHoraNotificacao"
        :suspeito="notificacao.suspeito"
        @update:dataHoraNotificacao="updateDataHoraNotificacao"
        @update:tipoDocumento="updateSuspeito('tipoDocumento', $event)"
        @update:numeroDocumento="updateSuspeito('numeroDocumento', $event)"
        @update:nome="updateSuspeito('nome', $event)"
        @update:nomeDaMae="updateSuspeito('nomeDaMae', $event)"
        @update:sexo="updateSuspeito('sexo', $event)"
        @update:dataDeNascimento="updateSuspeito('dataDeNascimento', $event)"
        @update:cep="updateSuspeito('cep', $event)"
        @update:endereco="updateSuspeito('endereco', $event)"
        @update:numero="updateSuspeito('numero', $event)"
        @update:bairroId="updateSuspeito('bairroId', $event)"
        @update:telefoneResidencial="updateSuspeito('telefoneResidencial', $event)"
        @update:telefoneCelular="updateSuspeito('telefoneCelular', $event)"
        @update:telefoneContato="updateSuspeito('telefoneContato', $event)"
      />
      <sinais-e-sintomas
        :sintomatico="notificacao.sintomatico"
        :data-inicio-dos-sintomas="notificacao.dataInicioDosSintomas"
        :sintomas="notificacao.sintomas"
        @update:sintomatico="updateSintomatico"
        @update:dataInicioDosSintomas="updateDataInicioDosSintomas"
        @update:sintomaCoriza="updateSintoma('coriza', $event)"
        @update:sintomaTosseSeca="updateSintoma('tosseSeca', $event)"
        @update:sintomaDorDeGarganta="updateSintoma('dorDeGarganta', $event)"
        @update:sintomaMialgia="updateSintoma('mialgia', $event)"
        @update:tosseProdutiva="updateSintoma('tosseProdutiva', $event)"
        @update:sibilo="updateSintoma('sibilo', $event)"
        @update:desconfortoRespiratorio="updateSintoma('desconfortoRespiratorio', $event)"
        @update:dispneia="updateSintoma('dispneia', $event)"
        @update:taquipneia="updateSintoma('taquipneia', $event)"
        @update:saturacaoDeOximetriaDePulso="updateSintoma('saturacaoDeOximetriaDePulso', $event)"
        @update:cianoseCentral="updateSintoma('cianoseCentral', $event)"
        @update:diminuicaoDePulsoPeriferico="updateSintoma('diminuicaoDePulsoPeriferico', $event)"
        @update:hipotensao="updateSintoma('hipotensao', $event)"
        @update:diarreia="updateSintoma('diarreia', $event)"
        @update:cefaleia="updateSintoma('cefaleia', $event)"
        @update:nausea="updateSintoma('nausea', $event)"
        @update:vomito="updateSintoma('vomito', $event)"
        @update:outrosSintomas="updateSintoma('outros', $event)"
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
        @update:outros="updateComorbidade('outros', $event)"
      />
      <informacoes-complementares
        :informacoes-complementares="notificacao.informacaoComplementar"
        @update:medicacaoAntitermica="updateInformacaoComplementar('medicacaoAntitermica', $event)"
        @update:nomeMedicacaoAntitermica="updateInformacaoComplementar('nomeMedicacaoAntitermica', $event)"
        @update:medicacaoAnalgesica="updateInformacaoComplementar('medicacaoAnalgesica', $event)"
        @update:nomeMedicacaoAnalgesica="updateInformacaoComplementar('nomeMedicacaoAnalgesica', $event)"
        @update:medicacaoAntiflamatorio="updateInformacaoComplementar('medicacaoAntiflamatorio', $event)"
        @update:nomeMedicacaoAntiflamatorio="updateInformacaoComplementar('nomeMedicacaoAntiflamatorio', $event)"
        @update:medicacaoAntiviral="updateInformacaoComplementar('medicacaoAntiviral', $event)"
        @update:nomeMedicacaoAntiviral="updateInformacaoComplementar('nomeMedicacaoAntiviral', $event)"
        @update:historicoDeViagem="updateInformacaoComplementar('historicoDeViagem', $event)"
        @update:dataDaViagem="updateInformacaoComplementar('dataDaViagem', $event)"
        @update:localDaViagem="updateInformacaoComplementar('localDaViagem', $event)"
        @update:recebeuVacinaDaGripeNosUltimosDozeMeses="
          updateInformacaoComplementar('recebeuVacinaDaGripeNosUltimosDozeMeses', $event)
        "
      />
      <vinculo-epidemiologico
        :vinculo-epidemiologico="notificacao.vinculoEpidemiologico"
        @update:situacao1="updateVinculoEpidemiologico('situacao1', $event)"
        @update:situacao2="updateVinculoEpidemiologico('situacao2', $event)"
        @update:nome="updateVinculoEpidemiologico('nome', $event)"
      />
      <conclusao-atendimento
        :conclusao-atendimento="notificacao.conclusaoAtendimento"
        @update:isolamentoDomiciliar="updateConclusaoAtendimento('isolamentoDomiciliar', $event)"
        @update:leitoComum="updateConclusaoAtendimento('leitoComum', $event)"
        @update:leitoUti="updateConclusaoAtendimento('leitoUti', $event)"
        @update:prontoSocorroOuAtendimento="updateConclusaoAtendimento('prontoSocorroOuAtendimento', $event)"
      />
      <realizado-coleta
        :conclusao-atendimento="notificacao.conclusaoAtendimento"
        @update:laboratorioOficial="updateConclusaoAtendimento('laboratorioOficial', $event)"
        @update:laboratorioRedePrivada="updateConclusaoAtendimento('laboratorioRedePrivada', $event)"
      />
      <observacoes v-model="notificacao.observacoes"/>
      <botao-enviar @click="send"/>
    </base-page>
  </section>
</template>
<script>
import NotificacaoService from '@/services/NotificacaoService';
import BasePage from '@/components/commons/BasePage.vue';
import IdentificacaoCaso from '@/components/Notificacao/Form/IdentificacaoCaso/index.vue';
import SinaisESintomas from '@/components/Notificacao/Form/SinaisESintomas/index.vue';
import Comorbidades from '@/components/Notificacao/Form/Comorbidades/index.vue';
import InformacoesComplementares from '@/components/Notificacao/Form/InformacoesComplementares/index.vue';
import VinculoEpidemiologico from '@/components/Notificacao/Form/VinculoEpidemiologico/index.vue';
import ConclusaoAtendimento from '@/components/Notificacao/Form/ConclusaoAtendimento/index.vue';
import RealizadoColeta from '@/components/Notificacao/Form/RealizadoColeta/index.vue';
import Observacoes from '@/components/Notificacao/Form/Observacoes/index.vue';
import BotaoEnviar from '@/components/Notificacao/Form/BotaoEnviar.vue';
import Notificacao from '@/entities/Notificacao';

export default {
  components: {
    BasePage,
    IdentificacaoCaso,
    SinaisESintomas,
    Comorbidades,
    InformacoesComplementares,
    VinculoEpidemiologico,
    ConclusaoAtendimento,
    RealizadoColeta,
    Observacoes,
    BotaoEnviar,
  },
  data: () => ({
    notificacao: new Notificacao(),
  }),
  methods: {
    updateDataHoraNotificacao(dataHoraNotificacao) {
      this.notificacao.dataHoraNotificacao = dataHoraNotificacao;
    },
    updateSintomatico(sintomatico) {
      this.notificacao.sintomatico = sintomatico;
    },
    updateDataInicioDosSintomas(dataInicioDosSintomas) {
      this.notificacao.dataInicioDosSintomas = dataInicioDosSintomas;
    },
    updateSuspeito(campo, valor) {
      this.notificacao.suspeito[campo] = valor;
    },
    updateSintoma(campo, valor) {
      this.notificacao.sintomas[campo] = valor;
    },
    updateComorbidade(campo, valor) {
      this.notificacao.comorbidades[campo] = valor;
    },
    updateInformacaoComplementar(campo, valor) {
      this.notificacao.informacaoComplementar[campo] = valor;
    },
    updateVinculoEpidemiologico(campo, valor) {
      this.notificacao.vinculoEpidemiologico[campo] = valor;
    },
    updateConclusaoAtendimento(campo, valor) {
      this.notificacao.conclusaoAtendimento[campo] = valor;
    },
    send() {
      const requestNotificacao = this.notificacao.toRequestBody();
      NotificacaoService.save(requestNotificacao);
    },
  },
};
</script>
