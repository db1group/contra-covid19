const moment = require('moment');
const dicionarioValores = require('./dicionario-valores');
const tipoClassificacaoPessoaEnum = require('../../../enums/tipo-classificacao-pessoa-enum');
const sexoEnum = require('../../../enums/sexo-enum');
const tipoDocumentoEnum = require('../../../enums/tipo-documento-enum');
const racaCorEnum = require('../../../enums/raca-cor-enum');
const metodoExameEnum = require('../../../enums/metodo-exame-enum');
const contatoSuspeitoEnum = require('../../../enums/contato-suspeito-enum');
const localContatoSuspeitoEnum = require('../../../enums/local-contato-suspeito-enum');
const tipoNotificacaoEvolucaoEnum = require('../../../enums/tipo-notificacao-evolucao-enum');

const FORMATO_DATA = 'YYYY-MM-DD';

class EnviarNotificacaoRequest {
  constructor(notificacao) {
    const { dataHoraNotificacao, dataInicioDosSintomas } = notificacao.NotificacaoCovid19;
    this.possui_cpf = this.getPossuiCpf(notificacao);
    this.data_notificacao = moment(dataHoraNotificacao)
      .format(FORMATO_DATA);
    this.tipo_paciente = this.getTipoPaciente(notificacao);
    this.paciente = notificacao.Pessoa.nome;
    this.sexo = this.getSexo(notificacao);
    this.data_nascimento = moment(notificacao.Pessoa.dataDeNascimento)
      .format(FORMATO_DATA);
    this.nome_mae = notificacao.Pessoa.nomeDaMae;
    this.cnes_unidade_notifica = notificacao.UnidadeSaude.cnes;
    this.nome_notificador = notificacao.nomeNotificador;
    this.raca_cor = this.getRacaCor(notificacao);
    this.assintomatico = this.getAssintomatico(notificacao);
    if (this.assintomatico === dicionarioValores.boleano.Nao) {
      this.data_1o_sintomas = dataInicioDosSintomas
        ? moment(dataInicioDosSintomas).format(FORMATO_DATA)
        : null;
    }
    this.pais_residencia = notificacao.Pessoa.Pais ? notificacao.Pessoa.Pais.codigo : 1;
    if (this.tipo_paciente === 1) {
      this.passaporte = notificacao.Pessoa.passaporte;
    }
    this.pais_municipio_residencia = '';
    this.preencherEndereco(notificacao);
    this.preencherRaioX(notificacao);
    this.preencherTomografia(notificacao);
    this.preencherSintomas(notificacao);
    this.preencherMedicamento(notificacao);
    this.preencherColetaMaterial(notificacao);
    this.prencherViagem(notificacao);
    this.preencherContatoSuspeito(notificacao);
    this.preencherClassificacao(notificacao);
    this.preencherResidencia(notificacao);
    if (notificacao.Pessoa.tipoDocumento === tipoDocumentoEnum.values.CPF) {
      this.cpf = notificacao.Pessoa.numeroDocumento;
    }

    this.preencherTelefone(notificacao);
    this.preencherOcupacao(notificacao);
  }

  preencherTelefone(notificacao) {
    const { telefoneResidencial, telefoneCelular, telefoneContato } = notificacao.Pessoa;
    let telefone = '';
    if (telefoneResidencial !== '') {
      telefone = telefoneResidencial;
    } else if (telefoneContato !== '') {
      telefone = telefoneContato;
    } else {
      telefone = telefoneCelular;
    }
    this.telefone_paciente = telefone;
  }

  preencherOcupacao(notificacao) {
    this.ocupacao = notificacao.Pessoa.Ocupacao.classificacao;
  }

  preencherResidencia(notificacao) {
    this.uf_residencia = notificacao.Pessoa.Municipio.ufIBGE || '41';
    this.ibge_residencia = notificacao.Pessoa.Municipio.residenciaIBGE || '410010';
  }

  preencherClassificacao(notificacao) {
    const evolucoes = notificacao.NotificacaoEvolucaos;

    if (evolucoes.some((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Descartado)) {
      this.classificacao_final = dicionarioValores.classificacaoFinal.CasoDescartado;
    } else if (evolucoes.some((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Encerrado)) {
      this.classificacao_final = dicionarioValores.classificacaoFinal.CasoDescartado;
    } else if (evolucoes.some((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Confirmado)) {
      this.classificacao_final = dicionarioValores.classificacaoFinal.CasoConfirmado;
    } else {
      this.classificacao_final = dicionarioValores.classificacaoFinal.CasoSuspeito;
    }

    const evolucaoCurado = evolucoes.find((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Curado);
    const evolucaoObito = evolucoes.find((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Obito);
    if (evolucaoCurado) {
      this.evolucao = dicionarioValores.evolucao.Cura;
      this.data_cura_obito = moment(evolucaoCurado.dtEvolucao).format(FORMATO_DATA);
    } else if (evolucaoObito) {
      this.evolucao = dicionarioValores.evolucao.Obito;
      this.data_cura_obito = moment(evolucaoObito.dtEvolucao).format(FORMATO_DATA);
    } else {
      this.evolucao = dicionarioValores.evolucao.Ignorado;
    }
  }

  preencherContatoSuspeito(notificacao) {
    this.contato_suspeito = dicionarioValores.boleano.Nao;
    if (notificacao.NotificacaoCovid19.contatoComSuspeito
            && notificacao.NotificacaoCovid19.contatoComSuspeito
            !== contatoSuspeitoEnum.values.SemContato) {
      this.contato_suspeito = dicionarioValores.boleano.Sim;

      switch (notificacao.NotificacaoCovid19.localDoContatoComSuspeito) {
        case localContatoSuspeitoEnum.values.Domicilio:
          this.contato_suspeito = dicionarioValores.localContatoSuspeito.Domicilio;
          break;
        case localContatoSuspeitoEnum.values.UnidadeSaude:
          this.contato_suspeito = dicionarioValores.localContatoSuspeito.UnidadeSaude;
          break;
        case localContatoSuspeitoEnum.values.LocalTrabalho:
          this.contato_suspeito = dicionarioValores.localContatoSuspeito.LocalTrabalho;
          break;
        default:
          this.contato_suspeito = dicionarioValores.localContatoSuspeito.Desconhecido;
          break;
      }

      this.local_contato_suspeito_descricao = notificacao.NotificacaoCovid19.nomeSuspeito;
    }
  }

  prencherViagem(notificacao) {
    const { historicoDeViagem, dataDaViagem, localDaViagem } = notificacao.NotificacaoCovid19;
    this.historico_viagem = historicoDeViagem
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    if (historicoDeViagem) {
      this.data_ida_local = dataDaViagem ? moment(dataDaViagem).format(FORMATO_DATA) : null;
      this.local_viagem = localDaViagem;
    }
  }

  preencherColetaMaterial(notificacao) {
    const {
      coletaMaterialParaDiagnostico, dataDaColeta, nomeLaboratorioEnvioMaterial, metodoExame,
    } = notificacao.NotificacaoCovid19;
    this.coleta_amostra = coletaMaterialParaDiagnostico
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.data_coleta = dataDaColeta ? moment(dataDaColeta).format(FORMATO_DATA) : null;
    this.lab_executor = nomeLaboratorioEnvioMaterial;
    switch (metodoExame) {
      case metodoExameEnum.values.RTPCR:
        this.metodo = dicionarioValores.metodoExame.RTPCR;
        break;
      case metodoExameEnum.values.TesteRapido:
        this.metodo = dicionarioValores.metodoExame.TesteRapido;
        break;
      default:
        this.metodo = dicionarioValores.metodoExame.NaoInformado;
    }
  }

  preencherMedicamento(notificacao) {
    if (notificacao.NotificacaoCovid19.hidroxicloroquina) {
      this.uso_antiviral = dicionarioValores.medicamento.Hidroxicloroquina;
    } else if (notificacao.NotificacaoCovid19.tamiflu) {
      this.uso_antiviral = dicionarioValores.medicamento.Tamiflu;
    }
    this.uso_antiviral_descricao = notificacao.NotificacaoCovid19.nomeMedicamento;
  }

  preencherRaioX(notificacao) {
    if (notificacao.NotificacaoCovid19.raioXConsolidacao) {
      this.raiox_torax = dicionarioValores.raioXTorax.Consolidado;
    } else if (notificacao.NotificacaoCovid19.raioXInfiltrado) {
      this.raiox_torax = dicionarioValores.raioXTorax.InfiltradoIntersticial;
    } else if (notificacao.NotificacaoCovid19.raioXMisto) {
      this.raiox_torax = dicionarioValores.raioXTorax.Misto;
    } else if (notificacao.NotificacaoCovid19.raioXNormal) {
      this.raiox_torax = dicionarioValores.raioXTorax.Normal;
    } else if (notificacao.NotificacaoCovid19.raioXOutro) {
      this.raiox_torax = dicionarioValores.raioXTorax.Outro;
      this.raiox_torax_descricao = notificacao.NotificacaoCovid19.raioXOutro;
    }
  }

  preencherTomografia(notificacao) {
    if (notificacao.NotificacaoCovid19.tomografiaVitro) {
      this.tomografia = dicionarioValores.tomografia.VidroFosco;
    } else if (notificacao.NotificacaoCovid19.tomografiaDerrame) {
      this.tomografia = dicionarioValores.tomografia.AusenciaDerramePreural;
    } else if (notificacao.NotificacaoCovid19.tomografiaLinfonodo) {
      this.tomografia = dicionarioValores.tomografia.AusenciaLinfonodoMediastinal;
    } else if (notificacao.NotificacaoCovid19.tomografiaOutro) {
      this.tomografia = dicionarioValores.tomografia.Outro;
      this.tomografia_descricao = notificacao.NotificacaoCovid19.tomografiaOutro;
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  preencherSintomas(notificacao) {
    this.febre = notificacao.NotificacaoCovid19.temperaturaFebre
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.doenca_cardiovascular = notificacao.NotificacaoCovid19.doencaCardioVascularCronica
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.asas_nasais = notificacao.NotificacaoCovid19.batimentoAsasNasais
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.tosse = notificacao.NotificacaoCovid19.tosse
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.dor_garganta = notificacao.NotificacaoCovid19.dorDeGarganta
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.mialgia = notificacao.NotificacaoCovid19.mialgia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.artralgia = notificacao.NotificacaoCovid19.artralgia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.diarreia = notificacao.NotificacaoCovid19.diarreia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.nausea_vomitos = notificacao.NotificacaoCovid19.nauseaVomito
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.coriza = notificacao.NotificacaoCovid19.coriza
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.irritabilidade_confusao = notificacao.NotificacaoCovid19.irritabilidadeConfusao
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.adinamia = notificacao.NotificacaoCovid19.adinamiaFraqueza
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.escarro = notificacao.NotificacaoCovid19.escarro
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.calafrios = notificacao.NotificacaoCovid19.calafrios
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.congestao_nasal = notificacao.NotificacaoCovid19.congestaoNasal
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.dificuldade_deglutir = notificacao.NotificacaoCovid19.dificuldadeDeglutir
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.manchas_vermelhas = notificacao.NotificacaoCovid19.manchasVermelhas
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.ganglios_linfaticos = notificacao.NotificacaoCovid19.gangliosLinfaticos
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.saturacao_o2 = notificacao.NotificacaoCovid19.saturacaoDeOximetriaDePulso
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.cianose = notificacao.NotificacaoCovid19.cianoseCentral
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.tiragem_intercostal = notificacao.NotificacaoCovid19.tiragemIntercostal
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.dispneia = notificacao.NotificacaoCovid19.dispneia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.cefaleia = notificacao.NotificacaoCovid19.cefaleia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.hipertensao = notificacao.NotificacaoCovid19.hipertensao
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.diabetes = notificacao.NotificacaoCovid19.diabetesMellitus
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.doenca_hepatica = notificacao.NotificacaoCovid19.doencaHepaticaCronica
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.hipertensao = notificacao.NotificacaoCovid19.hipertensao
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.sindrome_down = notificacao.NotificacaoCovid19.sindromeDeDown
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.doenca_neurologica = notificacao.NotificacaoCovid19.doencaHepaticaCronica
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.imunodeficiencia = notificacao.NotificacaoCovid19.imunodeficiencia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.infeccao_hiv = notificacao.NotificacaoCovid19.infeccaoHIV
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.doenca_renal = notificacao.NotificacaoCovid19.doencaRenalCronica
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.neoplasia = notificacao.NotificacaoCovid19.neoplasia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.puerperio = notificacao.NotificacaoCovid19.puerperaAte45DiasDoParto
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.obesidade = notificacao.NotificacaoCovid19.obesidade
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.tabagismo = notificacao.NotificacaoCovid19.tabagismo
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.outras_morbidades = notificacao.NotificacaoCovid19.outrosComorbidades
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    const outrosSintomas = notificacao.NotificacaoCovid19.outrosSintomas.trim();
    if (outrosSintomas !== '') {
      this.outros_sintomas = outrosSintomas;
    }
  }

  preencherEndereco(notificacao) {
    if (notificacao.Pessoa.cep) {
      this.cep_residencia = notificacao.Pessoa.cep;
    }

    if (notificacao.Pessoa.Bairro.nome) {
      const bairro = notificacao.Pessoa.Bairro.nome;
      this.bairro_residencia = bairro;
      if (bairro === 'GERAL') {
        this.bairro_residencia = notificacao.Pessoa.complemento;
      }
    }

    if (notificacao.Pessoa.endereco) {
      this.logradouro_residencia = notificacao.Pessoa.endereco;
    }

    if (notificacao.Pessoa.numero) {
      this.numero_residencia = notificacao.Pessoa.numero;
    }
  }

  getPossuiCpf(notificacao) {
    if (notificacao.Pessoa.tipoDocumento
            !== tipoDocumentoEnum.values.CPF) { return dicionarioValores.possuiCpf.NaoInformado; }

    if (!notificacao.Pessoa.numeroDocumento) { return dicionarioValores.possuiCpf.NaoInformado; }

    return dicionarioValores.possuiCpf.Sim;
  }

  getAssintomatico(notificacao) {
    const { sintomatico = false } = notificacao.NotificacaoCovid19;
    return sintomatico
      ? dicionarioValores.boleano.Nao
      : dicionarioValores.boleano.Sim;
  }

  getRacaCor(notificacao) {
    switch (notificacao.Pessoa.racaCor) {
      case racaCorEnum.values.Branca:
        return dicionarioValores.racaCor.Branca;
      case racaCorEnum.values.Preta:
        return dicionarioValores.racaCor.Preta;
      case racaCorEnum.values.Amarela:
        return dicionarioValores.racaCor.Amarela;
      case racaCorEnum.values.Parda:
        return dicionarioValores.racaCor.Parda;
      case racaCorEnum.values.Indigena:
        return dicionarioValores.racaCor.Indigena;
      default:
        return dicionarioValores.racaCor.Ignorado;
    }
  }

  getSexo(notificacao) {
    switch (notificacao.Pessoa.sexo) {
      case sexoEnum.Masculino:
        return dicionarioValores.sexo.Masculino;
      case sexoEnum.values.Feminino:
        return dicionarioValores.sexo.Feminino;
      default:
        return dicionarioValores.sexo.NaoInformado;
    }
  }

  getTipoPaciente(notificacao) {
    let tipoPacinete = '';

    switch (notificacao.Pessoa.tipoClassificacaoPessoa) {
      case tipoClassificacaoPessoaEnum.values.CriancaAte12Anos:
        tipoPacinete = dicionarioValores.tipoPaciente.CriancaAte12Anos;
        break;
      case tipoClassificacaoPessoaEnum.values.EmSituacaoRua:
        tipoPacinete = dicionarioValores.tipoPaciente.EmSituacaoRua;
        break;
      case tipoClassificacaoPessoaEnum.values.Estrangeiro:
        tipoPacinete = dicionarioValores.tipoPaciente.Estrageiro;
        break;
      case tipoClassificacaoPessoaEnum.values.Indigena:
        tipoPacinete = dicionarioValores.tipoPaciente.Indigena;
        break;
      case tipoClassificacaoPessoaEnum.values.Outro:
        tipoPacinete = dicionarioValores.tipoPaciente.CpfInformado;
        break;
      case tipoClassificacaoPessoaEnum.values.Outros:
        tipoPacinete = dicionarioValores.tipoPaciente.CpfInformado;
        break;
      default:
        break;
    }

    return tipoPacinete;
  }
}

module.exports = EnviarNotificacaoRequest;
