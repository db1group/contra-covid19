const repos = require('../repositories/repository-factory');
const models = require('../models');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');
const DocumentValidator = require('../validations/custom/document-validator');
const tipoClassificacaoPessoaEnum = require('../enums/tipo-classificacao-pessoa-enum');

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

const salvarNotificacao = async (notificacao, transaction) => {
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
    return notificacaoId;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

exports.handle = async (notificacaoRequest, userEmail) => {
  const transaction = await models.sequelize.transaction();

  try {
    const user = await repos.usuarioRepository.getPorEmail(userEmail, transaction);
    if (!user) throw new RegraNegocioErro('Usuário não encontrado!');

    const { tipoDocumento, numeroDocumento } = notificacaoRequest.suspeito;
    const notificacoesAbertasPorPessoaDocumento = await repos.notificacaoRepository
      .getPorPessoaDocumento(tipoDocumento, numeroDocumento, 'ABERTA', transaction);
    if (notificacoesAbertasPorPessoaDocumento.length > 0) {
      throw new RegraNegocioErro('Já existe uma notificação aberta para este paciente.');
    }

    const { suspeito } = notificacaoRequest;
    const { unidadeSaudeId } = notificacaoRequest;
    const { municipioId } = suspeito;
    const suspeitoConsolidado = await consolidarSuspeito(suspeito);

    const unidadeDeSaude = await repos.unidadeSaudeRepository
      .getPorId(notificacaoRequest.unidadeSaudeId, transaction);

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
    const notificacaoId = await salvarNotificacao(notificacao, transaction);
    await transaction.commit();

    const notificacaoSalva = await repos.notificacaoRepository.getPorId(notificacaoId);
    return Mappers.Notificacao.mapearParaResponse(
      notificacaoSalva,
      notificacaoSalva.NotificacaoCovid19,
    );
  } catch (error) {
    await transaction.rollback();
    throw (error);
  }
};
