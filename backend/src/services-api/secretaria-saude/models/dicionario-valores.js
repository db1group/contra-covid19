exports.possuiCpf = {
  Sim: 1,
  Nao: 2,
  NaoInformado: 3,
};

exports.tipoPaciente = {
  Estrageiro: 1,
  Indigena: 2,
  CpfInformado: 3,
  EmSituacaoRua: 5,
  CriancaAte12Anos: 6,
};

exports.racaCor = {
  Branca: 1,
  Preta: 2,
  Amarela: 3,
  Parda: 4,
  Indigena: 5,
  Ignorado: 6,
};

exports.sexo = {
  Masculino: 1,
  Feminino: 2,
  NaoInformado: 3,
};

exports.ocupacao = {
  ProfissionalSaude: 1,
  EstudanteAreaSaude: 2,
  ProfissionalLaboratorio: 3,
  ProfissionalSegurancaPublica: 4,
  Outro: 5,
};

exports.raioXTorax = {
  Normal: 1,
  Misto: 2,
  InfiltradoIntersticial: 3,
  Consolidado: 4,
  Outro: 5,
};

exports.tomografia = {
  VidroFosco: 1,
  AusenciaLinfonodoMediastinal: 2,
  AusenciaDerramePreural: 3,
  Outro: 4,
};

exports.metodoExame = {
  RTPCR: 1,
  TesteRapido: 2,
  NaoInformado: 3,
};

exports.localContatoSuspeito = {
  Domicilio: 1,
  UnidadeSaude: 2,
  LocalTrabalho: 3,
  Desconhecido: 4,
  Outro: 5,
};

exports.classificacaoFinal = {
  CasoSuspeito: 1,
  CasoConfirmado: 2,
  CasoDescartado: 3,
  CasoAConfirmar: 4,
};

exports.evolucao = {
  Cura: 1,
  Obito: 2,
  Ignorado: 3,
};

exports.criterioClassificacao = {
  Laboratorial: 1,
  ClinicoEpidemiologico: 2,
  EmInvestigacao: 3,
  NaoSeAplica: 4,
};

exports.medicamento = {
  Tamiflu: '3',
  Hidroxicloroquina: '4',
};

exports.gestante = {
  Sim: 1,
  Nao: 2,
  NaoInformado: 3,
};

exports.boleano = {
  Sim: 1,
  Nao: 2,
  NaoInformado: 3,
};

exports.periodoGestacao = {
  PrimeiroTrimestre: 1,
  SegundoTrimestre: 2,
  TerceiroTrimestre: 3,
  IdadeGestIgnorada: 4,
};
