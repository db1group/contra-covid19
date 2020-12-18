const moment = require('moment');
const dicionarioValores = require('./dicionario-valores');
const tipoClassificacaoPessoaEnum = require('../../../enums/tipo-classificacao-pessoa-enum');
const sexoEnum = require('../../../enums/sexo-enum');
const gestanteEnum = require('../../../enums/gestante-enum');
const periodoGestacaoEnum = require('../../../enums/periodo-gestacao-enum');
const tipoDocumentoEnum = require('../../../enums/tipo-documento-enum');
const racaCorEnum = require('../../../enums/raca-cor-enum');
const metodoExameEnum = require('../../../enums/metodo-exame-enum');
const contatoSuspeitoEnum = require('../../../enums/contato-suspeito-enum');
const localContatoSuspeitoEnum = require('../../../enums/local-contato-suspeito-enum');
const tipoNotificacaoEvolucaoEnum = require('../../../enums/tipo-notificacao-evolucao-enum');
const tipoInternacaoEnum = require('../../../enums/tipo-internacao-enum');
const pacienteInstitucionalizadoEnum = require('../../../enums/paciente-institucionalizado-enum');
const tpPacienteInstitucionalizadoEnum = require('../../../enums/tipo-paciente-institucionalizado-enum');

const FORMATO_DATA = 'YYYY-MM-DD';

const toInt = (value) => {
  const parsed = parseInt(value, 10);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(parsed) ? null : parsed;
};

class EnviarNotificacaoRequest {
  constructor(notificacao) {
    const { dataHoraNotificacao, dataInicioDosSintomas } = notificacao.NotificacaoCovid19;
    const { dtEncerramento } = notificacao;
    this.possui_cpf = this.getPossuiCpf(notificacao);
    this.data_notificacao = moment(dataHoraNotificacao)
      .format(FORMATO_DATA);
    this.data_encerramento = dtEncerramento
      ? moment(dataHoraNotificacao).format(FORMATO_DATA)
      : null;
    this.tipo_paciente = this.getTipoPaciente(notificacao);
    this.paciente = notificacao.Pessoa.nome;
    this.sexo = this.getSexo(notificacao);
    this.gestante = this.getGestante(notificacao);
    this.gestante_alto_risco = this.getGestanteAltoRisco(notificacao);
    this.periodo_gestacao = this.getPeriodoGestacional(notificacao);
    this.data_nascimento = moment(notificacao.Pessoa.dataDeNascimento)
      .format(FORMATO_DATA);
    this.idade = toInt(moment().diff(moment(notificacao.Pessoa.dataDeNascimento), 'years'));
    this.nome_mae = notificacao.Pessoa.nomeDaMae;
    const { nome, cnes, Municipio = {} } = notificacao.UnidadeSaude;
    const { residenciaIBGE, ufIBGE } = Municipio || {};
    this.nome_unidade_notifica = nome;
    this.cnes_unidade_notifica = cnes;
    this.uf_unidade_notifica = residenciaIBGE;
    this.ibge_unidade_notifica = ufIBGE;
    this.nome_notificador = notificacao.nomeNotificador;
    this.email_notificador = notificacao.User.email;
    // this.ocupacao_notificador = notificacao.Profissao.nome;
    this.telefone_notificador = null;
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
    this.preencherContatoConfirmado(notificacao);
    this.preencherClassificacao(notificacao);
    this.preencherResidencia(notificacao);
    this.preencherDocumentos(notificacao);
    this.preencherTelefone(notificacao);
    this.preencherOcupacao(notificacao);
    this.preencherHospitalizacao(notificacao);
    this.preencherFrequentouUnidade(notificacao);
    this.preencherPacienteInstitucionalizado(notificacao);
  }

  getPeriodoGestacional(notificacao) {
    switch (notificacao.Pessoa.tipoPeriodoGestacional) {
      case periodoGestacaoEnum.values.PrimeiroTrimestre:
        return dicionarioValores.periodoGestacao.PrimeiroTrimestre;
      case periodoGestacaoEnum.values.SegundoTrimestre:
        return dicionarioValores.periodoGestacao.SegundoTrimestre;
      case periodoGestacaoEnum.values.TerceiroTrimestre:
        return dicionarioValores.periodoGestacao.TerceiroTrimestre;
      case periodoGestacaoEnum.values.IdadeGestacionalIgnorada:
        return dicionarioValores.periodoGestacao.IdadeGestIgnorada;
      default:
        return null;
    }
  }

  getGestante(notificacao) {
    if (this.sexo === dicionarioValores.sexo.Masculino) {
      return dicionarioValores.boleano.Nao;
    }
    switch (notificacao.Pessoa.gestante) {
      case gestanteEnum.values.Sim:
        return dicionarioValores.gestante.Sim;
      case gestanteEnum.values.Nao:
        return dicionarioValores.gestante.Nao;
      default:
        return dicionarioValores.gestante.NaoInformado;
    }
  }

  getGestanteAltoRisco(notificacao) {
    const { gestanteAltoRisco = false } = notificacao.Pessoa;
    return gestanteAltoRisco
      ? dicionarioValores.gestanteAltoRisco.Sim
      : dicionarioValores.gestanteAltoRisco.Nao;
  }

  preencherDocumentos(notificacao) {
    const { tipoDocumento, numeroDocumento } = notificacao.Pessoa;
    this.cpf = 0;
    if (tipoDocumento === tipoDocumentoEnum.values.CPF) {
      this.cpf = numeroDocumento.trim() !== ''
        ? numeroDocumento.trim() : undefined;
    } else if (tipoDocumento === tipoDocumentoEnum.values.SUS) {
      this.cns = numeroDocumento;
    }
  }

  preencherTelefone(notificacao) {
    const { telefoneResidencial, telefoneCelular } = notificacao.Pessoa;
    const tpPaciente = this.getTipoPaciente(notificacao);
    const institucionalizado = this.getPacienteInstitucionalizado(
      notificacao.Pessoa.institucionalizado,
    );

    this.telefone_paciente = telefoneCelular;
    if (tpPaciente === dicionarioValores.tipoPaciente.EmSituacaoRua
      || tpPaciente === dicionarioValores.tipoPaciente.PrivadoDeLiberdade
      || institucionalizado) {
      this.telefone_paciente = null;
    }
    this.telefone_residencial_paciente = toInt(telefoneResidencial);
  }

  preencherOcupacao(notificacao) {
    const { classificacao } = notificacao.Pessoa.Ocupacao;
    this.ocupacao = toInt(classificacao);
    this.ocupacao_descricao = notificacao.Pessoa.ocupacao;
  }

  preencherResidencia(notificacao) {
    this.uf_residencia = notificacao.Pessoa.Municipio.ufIBGE || '41';
    this.ibge_residencia = notificacao.Pessoa.Municipio.residenciaIBGE || '410010';
  }

  preencherClassificacao(notificacao) {
    const evolucoes = notificacao.NotificacaoEvolucaos;
    const { numeroDo } = notificacao.NotificacaoCovid19;

    const evolucaoCurado = evolucoes.find((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Curado);
    const evolucaoObito = evolucoes.find((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Obito);
    const evolucaoDescartado = evolucoes.find((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Descartado);
    const evolucaoEncerrado = evolucoes.find((data) => data.tpEvolucao
            === tipoNotificacaoEvolucaoEnum.values.Encerrado);

    if (evolucaoCurado) {
      this.evolucao = dicionarioValores.evolucao.Cura;
      this.data_cura_obito = moment(evolucaoCurado.dtEvolucao).format(FORMATO_DATA);
    } else if (evolucaoObito) {
      this.evolucao = dicionarioValores.evolucao.Obito;
      this.data_cura_obito = moment(evolucaoObito.dtEvolucao).format(FORMATO_DATA);
      this.numero_do = toInt(numeroDo);
    } else if (evolucaoDescartado) {
      this.evolucao = dicionarioValores.evolucao.Cura;
      this.data_cura_obito = moment(evolucaoDescartado.dtEvolucao).format(FORMATO_DATA);
    } else if (evolucaoEncerrado) {
      this.evolucao = dicionarioValores.evolucao.Cura;
      this.data_cura_obito = moment(evolucaoEncerrado.dtEvolucao).format(FORMATO_DATA);
    } else {
      this.evolucao = dicionarioValores.evolucao.Ignorado;
    }
  }

  preencherContatoSuspeito(notificacao) {
    this.contato_suspeito = dicionarioValores.boleano.Nao;
    const {
      contatoComSuspeito, localDoContatoComSuspeito,
      nomeSuspeito,
    } = notificacao.NotificacaoCovid19;
    if (contatoComSuspeito && contatoComSuspeito === contatoSuspeitoEnum.values.Suspeito) {
      this.contato_suspeito = dicionarioValores.boleano.Sim;

      switch (localDoContatoComSuspeito) {
        case localContatoSuspeitoEnum.values.Domicilio:
          this.local_contato_suspeito = dicionarioValores.localContatoSuspeito.Domicilio;
          break;
        case localContatoSuspeitoEnum.values.UnidadeSaude:
          this.local_contato_suspeito = dicionarioValores.localContatoSuspeito.UnidadeSaude;
          break;
        case localContatoSuspeitoEnum.values.LocalTrabalho:
          this.local_contato_suspeito = dicionarioValores.localContatoSuspeito.LocalTrabalho;
          break;
        default:
          this.local_contato_suspeito = dicionarioValores.localContatoSuspeito.Desconhecido;
          break;
      }

      this.local_contato_suspeito_descricao = nomeSuspeito;
    }
  }

  preencherContatoConfirmado(notificacao) {
    this.contato_confirmado = dicionarioValores.boleano.Nao;
    const {
      contatoComSuspeito, localDoContatoComSuspeito,
      nomeSuspeito, descricaoLocal,
    } = notificacao.NotificacaoCovid19;
    if (contatoComSuspeito && contatoComSuspeito === contatoSuspeitoEnum.values.Confirmado) {
      this.contato_confirmado = dicionarioValores.boleano.Sim;

      switch (localDoContatoComSuspeito) {
        case localContatoSuspeitoEnum.values.Domicilio:
          this.local_contato_confirmado = dicionarioValores.localContatoSuspeito.Domicilio;
          break;
        case localContatoSuspeitoEnum.values.UnidadeSaude:
          this.local_contato_confirmado = dicionarioValores.localContatoSuspeito.UnidadeSaude;
          break;
        case localContatoSuspeitoEnum.values.LocalTrabalho:
          this.local_contato_confirmado = dicionarioValores.localContatoSuspeito.LocalTrabalho;
          break;
        default:
          this.local_contato_confirmado = dicionarioValores.localContatoSuspeito.Desconhecido;
          break;
      }

      this.local_contato_confirmado_descricao = descricaoLocal;
      this.nome_caso_fonte = nomeSuspeito;
    }
  }

  prencherViagem(notificacao) {
    const {
      historicoDeViagem, dataDaViagem, localDaViagem,
      dataRetornoLocal, descritivoViagem, dataChegadaBrasil,
      dataChegadaUF,
    } = notificacao.NotificacaoCovid19;
    this.historico_viagem = historicoDeViagem
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    if (historicoDeViagem) {
      this.data_ida_local = dataDaViagem ? moment(dataDaViagem).format(FORMATO_DATA) : null;
      this.local_viagem = localDaViagem;
      this.data_retorno_local = dataRetornoLocal;
      this.descritivo_viagem = descritivoViagem;
      this.data_chegada_brasil = dataChegadaBrasil;
      this.data_chegada_estado = dataChegadaUF;
    }
  }

  preencherColetaMaterial(notificacao) {
    const { coletaMaterialParaDiagnostico } = notificacao.NotificacaoCovid19;
    if (!coletaMaterialParaDiagnostico) return;

    const {
      dataDaColeta, nomeLaboratorioEnvioMaterial, metodoDeExame,
      codigoExame, requisicao, dataCadastroExame, dataRecebimentoExame, dataLiberacaoExame,
      Exame, ResultadoExame,
      Laboratorio, pesquisaGal,
    } = notificacao.NotificacaoCovid19;

    if (Exame) {
      const { codigo: codExame } = Exame;
      this.exame = toInt(codExame);
    }
    if (ResultadoExame) {
      const { codigo: codResultado } = ResultadoExame;
      this.resultado = toInt(codResultado);
    }
    if (Laboratorio) {
      const { cnes: cnesLab } = Laboratorio;
      this.unidade_solicitante_gal = cnesLab;
    }

    this.coleta_amostra = coletaMaterialParaDiagnostico
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.data_coleta = dataDaColeta ? moment(dataDaColeta).format(FORMATO_DATA) : null;
    this.lab_executor = nomeLaboratorioEnvioMaterial;
    this.co_seq_exame = toInt(codigoExame);
    this.requisicao = requisicao;
    this.data_cadastro = dataCadastroExame ? moment(dataCadastroExame).format(FORMATO_DATA) : null;
    this.data_recebimento = dataRecebimentoExame
      ? moment(dataRecebimentoExame).format(FORMATO_DATA) : null;
    this.data_liberacao = dataLiberacaoExame
      ? moment(dataLiberacaoExame).format(FORMATO_DATA) : null;

    this.pesquisa_gal = toInt(pesquisaGal);
    switch (metodoDeExame) {
      case metodoExameEnum.values.RTPCR:
        this.metodo = dicionarioValores.metodoExame.RTPCR;
        break;
      case metodoExameEnum.values.TesteRapido:
        this.metodo = dicionarioValores.metodoExame.TesteRapido;
        break;
      case metodoExameEnum.values.Elisa:
        this.metodo = dicionarioValores.metodoExame.Elisa;
        break;
      case metodoExameEnum.values.Quimioluminescencia:
        this.metodo = dicionarioValores.metodoExame.Quimioluminescencia;
        break;
      case metodoExameEnum.values.Imunofluorescencia:
        this.metodo = dicionarioValores.metodoExame.Imunofluorescencia;
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
    } else if (notificacao.NotificacaoCovid19.cloroquina) {
      this.uso_antiviral = dicionarioValores.medicamento.Cloroquina;
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
    this.febre = notificacao.NotificacaoCovid19.febreAferidaReferida
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
    this.congestao_conjuntiva = notificacao.NotificacaoCovid19.conjuntivite
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
    this.doenca_pulmonar = notificacao.NotificacaoCovid19.doencaPulmonar
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.neoplasia = notificacao.NotificacaoCovid19.neoplasia
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.puerperio = notificacao.NotificacaoCovid19.puerperaAte45DiasDoParto
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.obesidade = notificacao.NotificacaoCovid19.obesidade
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.tabagismo = notificacao.NotificacaoCovid19.tabagismo
      ? dicionarioValores.boleano.Sim : dicionarioValores.boleano.Nao;
    this.perda_olfato_paladar = notificacao.NotificacaoCovid19.perdaOlfatoPaladar
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
      this.cep_residencia = toInt(notificacao.Pessoa.cep);
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
      this.numero_residencia = toInt(notificacao.Pessoa.numero);
    }
  }

  getPossuiCpf(notificacao) {
    const { tipoDocumento, numeroDocumento = '' } = notificacao.Pessoa;
    if (tipoDocumento !== tipoDocumentoEnum.values.CPF) {
      return dicionarioValores.possuiCpf.Nao;
    }
    if (numeroDocumento.trim() === '') { return dicionarioValores.possuiCpf.Nao; }
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
        return null;
    }
  }

  getSexo(notificacao) {
    switch (notificacao.Pessoa.sexo) {
      case sexoEnum.values.Masculino:
        return dicionarioValores.sexo.Masculino;
      case sexoEnum.values.Feminino:
        return dicionarioValores.sexo.Feminino;
      default:
        return dicionarioValores.sexo.NaoInformado;
    }
  }

  getTipoPaciente(notificacao) {
    let tipoPacinete = dicionarioValores.tipoPaciente.CpfInformado;

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
      case tipoClassificacaoPessoaEnum.values.PrivadoLiberdade:
        tipoPacinete = dicionarioValores.tipoPaciente.PrivadoDeLiberdade;
        break;
      default:
        break;
    }

    return tipoPacinete;
  }

  getTipoInternacao(tipoLeito) {
    switch (tipoLeito) {
      case tipoInternacaoEnum.values.Enfermaria:
        return dicionarioValores.tipoInternacao.Enfermaria;
      case tipoInternacaoEnum.values.UTI:
        return dicionarioValores.tipoInternacao.UTI;
      default:
        return dicionarioValores.tipoInternacao.NaoInformado;
    }
  }

  preencherHospitalizacao(notificacao) {
    const { hospitalizado = false } = notificacao.NotificacaoCovid19;
    if (!hospitalizado) return;
    const {
      internacaoSus, tipoLeito, dataInternamento, dataIsolamento,
      dataAlta, Hospital = {},
    } = notificacao.NotificacaoCovid19;
    const { nome, cnes, Municipio = {} } = Hospital || {};
    const { ufIBGE, residenciaIBGE } = Municipio || {};

    this.hospitalizado = hospitalizado;
    this.cnes_hospital = cnes;
    this.nome_hospital = nome;
    this.uf_hospital = ufIBGE;
    this.ibge_hospital = residenciaIBGE;
    this.internacao_sus = internacaoSus
      ? dicionarioValores.boleano.Sim
      : dicionarioValores.boleano.Nao;

    this.tipo_internacao = this.getTipoInternacao(tipoLeito);
    this.data_entrada = dataInternamento
      ? moment(dataInternamento).format(FORMATO_DATA)
      : null;
    this.data_isolamento = dataIsolamento
      ? moment(dataIsolamento).format(FORMATO_DATA)
      : null;
    this.data_alta = dataAlta
      ? moment(dataAlta).format(FORMATO_DATA)
      : null;
  }

  preencherFrequentouUnidade(notificacao) {
    const {
      frequentouUnidade = false,
      UnidadeFrequentada = {},
    } = notificacao.NotificacaoCovid19;
    if (!frequentouUnidade) return;
    const { nome, cnes } = UnidadeFrequentada || {};
    this.frequentou_unidade = dicionarioValores.boleano.Nao;
    if (!frequentouUnidade) return;
    this.frequentou_unidade_cnes = cnes;
    this.frequentou_unidade_descricao = nome;
  }

  getPacienteInstitucionalizado(institucionalizado) {
    if (!institucionalizado) return null;
    switch (institucionalizado) {
      case pacienteInstitucionalizadoEnum.values.CasaRepousoAsilo:
        return dicionarioValores.pacienteInstitucionalizado.CasaRepousoAsilo;
      case pacienteInstitucionalizadoEnum.values.CentroSocioEducacao:
        return dicionarioValores.pacienteInstitucionalizado.CentroSocioEducacao;
      case pacienteInstitucionalizadoEnum.values.ClinicasReabilitacao:
        return dicionarioValores.pacienteInstitucionalizado.ClinicasReabilitacao;
      case pacienteInstitucionalizadoEnum.values.SeminarioConvento:
        return dicionarioValores.pacienteInstitucionalizado.SeminarioConvento;
      case pacienteInstitucionalizadoEnum.values.ServicosAcolhimento:
        return pacienteInstitucionalizadoEnum.values.ServicosAcolhimento;
      default:
        return dicionarioValores.pacienteInstitucionalizado.UnidadesPrisionais;
    }
  }

  getTipoPacienteInstitucionalizado(tpInstitucionalizado) {
    if (!tpInstitucionalizado) return null;
    return tpInstitucionalizado === tpPacienteInstitucionalizadoEnum.values.Trabalhador
      ? dicionarioValores.tipoPacienteInstitucionalizado.Trabalhador
      : dicionarioValores.tipoPacienteInstitucionalizado.Coabitante;
  }

  preencherPacienteInstitucionalizado(notificacao) {
    const { institucionalizado, tpInstitucionalizado, Instituicao } = notificacao.Pessoa;
    if (!institucionalizado) return;
    const { codigo } = Instituicao;
    this.paciente_institucionalizado = this.getPacienteInstitucionalizado(institucionalizado);
    this.tipo_paciente_institucionalizado = this.getTipoPacienteInstitucionalizado(
      tpInstitucionalizado,
    );
    this.instituicao = toInt(codigo);
  }
}

module.exports = EnviarNotificacaoRequest;
