const DocumentValidator = require('../validations/custom/document-validator');
const repos = require('../repositories/repository-factory');
const tipoClassificacaoPessoaEnum = require('../enums/tipo-classificacao-pessoa-enum');
const tipoDocumentoEnum = require('../enums/tipo-documento-enum');
const { RegraNegocioErro } = require('../lib/erros');

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
    sexo, gestante, tipoDocumento, numeroDocumento,
  } = suspeito;

  if (!validarDocumento(suspeito)) {
    throw new RegraNegocioErro(`${tipoDocumento} inválido.`);
  }

  const suspeitoPrototipo = { bairroId, municipioId };
  suspeitoPrototipo.gestante = obterGestante(sexo, gestante);

  if (tipoDocumento && numeroDocumento) {
    const pessoaJaCadastrada = await repos.pessoaRepository.getPorDocumento(suspeito);
    if (pessoaJaCadastrada !== null && pessoaJaCadastrada.id !== pessoaId) {
      let msgErro = `Este ${tipoDocumento} já está sendo utilizado por outro paciente.`;
      if (tipoDocumento === tipoDocumentoEnum.values.SUS) {
        msgErro = 'Esta carteira do SUS já está sendo utilizado por outro paciente.';
      }
      throw new RegraNegocioErro(msgErro);
    }
  }

  return { ...suspeitoPrototipo, pessoaId };
};

exports.handle = async ({ suspeito, ...notificacao }, tenant) => {
  const suspeitoConsolidado = await consolidarSuspeito(suspeito);
  const { municipioId } = suspeito;
  const { unidadeSaudeId } = notificacao;

  const unidadeDeSaude = await repos.unidadeSaudeRepository.getPorId(unidadeSaudeId, tenant);

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
