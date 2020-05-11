const DocumentValidator = require('../validations/custom/document-validator');
const PessoaRepository = require('../repositories/pessoa-repository');
const UnidadeSaudeRepository = require('../repositories/unidade-saude-repository');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');

const validarDocumento = ({ tipoDocumento, numeroDocumento }) => {
  if (!numeroDocumento) return true;
  if (tipoDocumento !== DocumentValidator.docs.CPF) return true;

  return DocumentValidator.IsCpfValid(numeroDocumento);
};

const obterGestante = (sexo, gestante) => {
  if (sexo === 'M') {
    return 'NAO_APLICADO';
  }
  return gestante;
};

const getPessoa = async (suspeito) => {
  const { nome, nomeDaMae } = suspeito;

  if (suspeito.numeroDocumento !== '') {
    let pessoaId;
    const pessoaLocalizada = await PessoaRepository.getPorDocumento(suspeito);
    if (pessoaLocalizada) pessoaId = pessoaLocalizada.id;
    return pessoaId;
  }

  const pessoasLocalizadas = await PessoaRepository.get(nome, nomeDaMae);
  if (pessoasLocalizadas.length >= 1) {
    throw new RegraNegocioErro(`A pessoa ${nome} (sem documento informado) já possui cadastro no sistema e não poderá ser criado um novo.`);
  }
  return null;
};

const cadastrarSuspeito = async (suspeito) => {
  const pessoa = Mappers.Pessoa.mapearParaModel(suspeito);
  const pessoaCadastrada = await PessoaRepository.adicionar(pessoa);
  return Mappers.Pessoa.mapearParaSuspeito(
    pessoaCadastrada,
  );
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

  const pessoaIdLocalizada = await getPessoa(suspeito);
  if (pessoaIdLocalizada) {
    return { ...suspeitoPrototipo, pessoaId: pessoaIdLocalizada };
  }

  const novaPessoaCadastrada = await cadastrarSuspeito(suspeitoAlterado);
  return Mappers.Pessoa.mapearParaSuspeito(novaPessoaCadastrada);
};

exports.handle = async ({ suspeito, ...notificacao }) => {
  const suspeitoConsolidado = await consolidarSuspeito(suspeito);
  const { municipioId } = suspeito;
  const { unidadeSaudeId } = notificacao;

  const unidadeDeSaude = await UnidadeSaudeRepository.getPorId(unidadeSaudeId);

  if (!unidadeDeSaude) {
    throw new RegraNegocioErro(`Não foi localizada a unidade de saúde com o código ${unidadeSaudeId}`);
  }

  return {
    ...notificacao,
    suspeito: {
      municipioId,
      ...suspeitoConsolidado,
    },
    unidadeDeSaude: {
      ...unidadeDeSaude.dataValues,
    },
  };
};
