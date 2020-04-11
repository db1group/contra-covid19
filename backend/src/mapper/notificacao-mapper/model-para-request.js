const notificacaoParaRequest = (notificacao, notificacaoHistorico, request) => {
    const { unidadeSaudeId, notificadorId, userId } = notificacao;
    const { dataHoraNotificacao, dataInicioDosSintomas, sintomatico } = notificacaoHistorico;
    return {
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
    const { pessoaId, bairroId, municipioId } = notificacao;
    return {
        pessoaId,
        // nome,
        // dataDeNascimento,
        // sexo,
        // idade,
        bairroId,
        // nomeDaMae,
        // ocupacao,
        // endereco,
        // numero,
        // bairro,
        municipioId,
        // telefoneResidencial,
        // telefoneContato,
        // telefoneCelular,
    }
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
    notificacaoParaRequest,
    extrairSuspeito,
    extrairSintomas,
    extrairComorbidades,
    extrairInformacaoComplementar,
    extrairVinculoEpidemiologico,
    extrairConclusaoAtendimento,
};