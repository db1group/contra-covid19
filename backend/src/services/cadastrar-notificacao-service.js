const { Sequelize } = require('sequelize');
const repos = require('../repositories/repository-factory');
const models = require('../models');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');
const DocumentValidator = require('../validations/custom/document-validator');
const tipoClassificacaoPessoaEnum = require('../enums/tipo-classificacao-pessoa-enum');

const { Op } = Sequelize;

const buscarPessoaId = async (suspeito) => {
  const { nome, nomeDaMae } = suspeito;

  if (suspeito.numeroDocumento !== '') {
    let pessoaId;
    const pessoaLocalizada = await repos.pessoaRepository.getPorDocumento(suspeito);
    if (pessoaLocalizada) pessoaId = pessoaLocalizada.id;
    return pessoaId;
  }

  const pessoasLocalizadas = await repos.pessoaRepository.get(nome, nomeDaMae);
  if (pessoasLocalizadas.length >= 1) {
    throw new RegraNegocioErro(`A pessoa ${nome} (sem documento informado) já possui cadastro no sistema e não poderá ser criado um novo.`);
  }
  return null;
};

const cadastrarSuspeito = async (suspeito) => {
  const pessoa = Mappers.Pessoa.mapearParaModel(suspeito);
  const pessoaCadastrada = await repos.pessoaRepository.cadastrar(pessoa);
  return Mappers.Pessoa.mapearParaSuspeito(
    pessoaCadastrada.dataValues,
  );
};

const validarDocumento = ({ tipoClassificacaoPessoa, tipoDocumento, numeroDocumento }) => {
  if (tipoDocumento !== DocumentValidator.docs.CPF) return true;

  if (tipoClassificacaoPessoa !== tipoClassificacaoPessoaEnum.values.Outro
        && !numeroDocumento) return true;

  return DocumentValidator.IsCpfValid(numeroDocumento);
};

const obterGestante = (sexo, gestante) => {
  if (sexo === 'M') {
    return 'NAO_APLICADO';
  }
  return gestante;
};

const consolidarSuspeito = async (suspeito) => {
  const {
    pessoaId, bairroId, municipioId,
    sexo, gestante, tipoDocumento,
  } = suspeito;

  if (!validarDocumento(suspeito)) {
    throw new RegraNegocioErro(`${tipoDocumento} inválido.`);
  }

  let suspeitoPrototipo = { bairroId, municipioId };

  if (pessoaId) return { ...suspeitoPrototipo, pessoaId };

  const suspeitoAlterado = { ...suspeito };
  suspeitoAlterado.gestante = obterGestante(sexo, gestante);
  suspeitoPrototipo = { ...suspeitoPrototipo, gestante };

  const pessoaIdLocalizada = await buscarPessoaId(suspeito);
  if (pessoaIdLocalizada) {
    return { ...suspeitoPrototipo, pessoaId: pessoaIdLocalizada };
  }

  const novaPessoaCadastrada = await cadastrarSuspeito(suspeitoAlterado);
  return Mappers.Pessoa.mapearParaSuspeito(novaPessoaCadastrada);
};

const notificacaoAbertaJaExisteParaOPaciente = async ({ tipoDocumento, numeroDocumento }) => {
  if (!tipoDocumento) return false;
  if (!numeroDocumento) return false;

  const status = 'ABERTA';
  const notificacao = await models.Notificacao.count({
    where: {
      status,
    },
    include: {
      model: models.Pessoa,
      where: {
        [Op.and]: [{
          tipoDocumento,
        }, {
          numeroDocumento,
        }],
      },
      attributes: ['tipoDocumento', 'numeroDocumento'],
    },
  });

  return notificacao > 0;
};

const validarNotificacaoUnicaPorPaciente = async (notificacaoRequest) => {
  const existeNotificacaoAbertaParaOPaciente = await notificacaoAbertaJaExisteParaOPaciente(
    notificacaoRequest.suspeito,
  );

  if (existeNotificacaoAbertaParaOPaciente) {
    throw new RegraNegocioErro('Já existe uma notificação aberta para este paciente.');
  }
};

const salvarNotificacao = async (notificacao) => {
  const transaction = await models.sequelize.transaction();
  try {
    const novaNotificacao = await models.Notificacao.create(
      notificacao, { transaction },
    );
    const { id: notificacaoId } = novaNotificacao;
    await models.NotificacaoCovid19.create({
      notificacaoId,
      ...notificacao.notificacaoCovid19,
    }, { transaction });
    await models.NotificacaoEvolucao.create({
      notificacaoId,
      dtEvolucao: notificacao.notificacaoCovid19.dataHoraNotificacao,
      tpEvolucao: 'SUSPEITO',
      tpLocal: notificacao.notificacaoCovid19.situacaoNoMomentoDaNotificacao,
    }, { transaction });
    await transaction.commit();
    return notificacaoId;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

exports.handle = async (notificacaoRequest, userEmail) => {
  const user = await repos.usuarioRepository.getPorEmail(userEmail);
  if (!user) throw new RegraNegocioErro('Usuário não encontrado!');

  await validarNotificacaoUnicaPorPaciente(notificacaoRequest);

  const { suspeito } = notificacaoRequest;
  const { unidadeSaudeId } = notificacaoRequest;
  const { municipioId } = suspeito;
  const suspeitoConsolidado = await consolidarSuspeito(suspeito);

  const unidadeDeSaude = await repos.unidadeSaudeRepository
    .getPorId(notificacaoRequest.unidadeSaudeId);
  if (!unidadeDeSaude) {
    const msgErro = `Não foi localizada a unidade de saúde com o código ${unidadeSaudeId}`;
    throw new RegraNegocioErro(msgErro);
  }

  const notificacaoConsolidada = {
    ...notificacaoRequest,
    suspeito: {
      municipioId,
      ...suspeitoConsolidado,
    },
    unidadeDeSaude: {
      ...unidadeDeSaude.dataValues,
    },
  };

  notificacaoConsolidada.userId = user.id;
  const notificacao = Mappers.Notificacao.mapearParaNotificacao(
    notificacaoConsolidada,
  );

  notificacao.status = 'ABERTA';

  const notificacaoId = await salvarNotificacao(notificacao);

  const notificacaoSalva = await repos.notificacaoRepository.getPorId(notificacaoId);

  return Mappers.Notificacao.mapearParaResponse(
    notificacaoSalva,
    notificacaoSalva.NotificacaoCovid19,
  );
};
