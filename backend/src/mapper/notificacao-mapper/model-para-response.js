const notificacaoParaResponse = (notificacao, notificacaoHistorico, request) => {
    const { unidadeSaudeId, notificadorId, userId } = notificacao;
    const { dataHoraNotificacao, dataInicioDosSintomas, sintomatico } = notificacaoHistorico;
    return {
        id: notificacao.id,
        dataHoraNotificacao,
        unidadeSaudeId,
        notificadorId,
        sintomatico,
        dataInicioDosSintomas,
        userId,
        ...request
    }
}

const extrairSuspeito = (notificacao) => {
    const { Pessoa, Bairro } = notificacao;
    if (Pessoa)
        return extrairSuspeitoDaPessoa(Pessoa, Bairro);
    return extrairSuspeitoDaNotificacao(notificacao);
}

const extrairSuspeitoDaNotificacao = ({ pessoaId, bairroId, municipioId }) => {
    return {
        pessoaId,
        bairroId,
        municipioId,
    };
}

const extrairSuspeitoDaPessoa = ({
    id,
    nome,
    dataDeNascimento,
    sexo,
    idade,
    bairroId,
    nomeDaMae,
    ocupacao,
    endereco,
    numero,
    telefoneResidencial,
    telefoneContato,
    telefoneCelular,
}, bairro) => {

    return {
        pessoaId: id,
        nome,
        dataDeNascimento,
        sexo,
        idade,
        bairroId,
        nomeDaMae,
        ocupacao,
        endereco,
        numero,
        bairro: bairro ? bairro.nome : null,
        municipioId: bairro ? bairro.municipioId : null,
        telefoneResidencial,
        telefoneContato,
        telefoneCelular,
    };
}

const extrairSintomas = (notificacaoHistorico) => {
    const {
        coriza,
        tosseSeca,
        dorDeGarganta,
        mialgia,
        tosseProdutiva,
        sibilo,
        desconfortoRespiratorio,
        dispneia,
        taquipneia,
        saturacaoDeOximetriaDePulso,
        cianoseCentral,
        diminuicaoDePulsoPeriferico,
        hipotensao,
        diarreia,
        cefaleia,
        nausea,
        vomito,
        outrosSintomas,
    } = notificacaoHistorico;
    return {
        coriza,
        tosseSeca,
        dorDeGarganta,
        mialgia,
        tosseProdutiva,
        sibilo,
        desconfortoRespiratorio,
        dispneia,
        taquipneia,
        saturacaoDeOximetriaDePulso,
        cianoseCentral,
        diminuicaoDePulsoPeriferico,
        hipotensao,
        diarreia,
        cefaleia,
        nausea,
        vomito,
        outros: outrosSintomas
    };
}

const extrairComorbidades = (notificacaoHistorico) => {
    const {
        puerperaAte45DiasDoParto,
        sindromeDeDown,
        diabetesMellitus,
        imunodeficiencia,
        doencaCardioVascularCronica,
        doencaHepaticaCronica,
        doencaNeurologicaCronica,
        doencaRenalCronica,
        doencaHematologicaCronica,
        asma,
        outraPneumopatiaCronica,
        obesidade,
        outrosComorbidades,
    } = notificacaoHistorico;
    return {
        puerperaAte45DiasDoParto,
        sindromeDeDown,
        diabetesMellitus,
        imunodeficiencia,
        doencaCardioVascularCronica,
        doencaHepaticaCronica,
        doencaNeurologicaCronica,
        doencaRenalCronica,
        doencaHematologicaCronica,
        asma,
        outraPneumopatiaCronica,
        obesidade,
        outros: outrosComorbidades,
    };
}

const extrairInformacaoComplementar = (notificacaoHistorico) => {
    const {
        medicacaoAntitermica,
        nomeMedicacaoAntitermica,
        medicacaoAnalgesica,
        nomeMedicacaoAnalgesica,
        medicacaoAntiflamatorio,
        nomeMedicacaoAntiflamatorio,
        medicacaoAntiviral,
        nomeMedicacaoAntiviral,
        historicoDeViagem,
        dataDaViagem,
        localDaViagem,
        recebeuVacinaDaGripeNosUltimosDozeMeses,
    } = notificacaoHistorico;
    return {
        medicacaoAntitermica,
        nomeMedicacaoAntitermica,
        medicacaoAnalgesica,
        nomeMedicacaoAnalgesica,
        medicacaoAntiflamatorio,
        nomeMedicacaoAntiflamatorio,
        medicacaoAntiviral,
        nomeMedicacaoAntiviral,
        historicoDeViagem,
        dataDaViagem,
        localDaViagem,
        recebeuVacinaDaGripeNosUltimosDozeMeses,
    };
}

const extrairVinculoEpidemiologico = (notificacaoHistorico) => {
    const {
        situacao1,
        situacao2,
        nomeTeveContato,
    } = notificacaoHistorico;
    return {
        situacao1,
        situacao2,
        nome: nomeTeveContato,
    };
}

const extrairConclusaoAtendimento = (notificacaoHistorico) => {
    const {
        isolamentoDomiciliar,
        leitoComum,
        leitoUti,
        prontoSocorroOuAtendimento,
        coletaMaterialParaDiagnostico,
        laboratorioOficial,
        laboratorioRedePrivada,
    } = notificacaoHistorico;
    return {
        isolamentoDomiciliar,
        leitoComum,
        leitoUti,
        prontoSocorroOuAtendimento,
        coletaMaterialParaDiagnostico,
        laboratorioOficial,
        laboratorioRedePrivada,
    };
}

module.exports = {
    notificacaoParaResponse,
    extrairSuspeito,
    extrairSintomas,
    extrairComorbidades,
    extrairInformacaoComplementar,
    extrairVinculoEpidemiologico,
    extrairConclusaoAtendimento,
};