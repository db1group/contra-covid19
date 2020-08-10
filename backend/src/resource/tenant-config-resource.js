const moment = require('moment');
const models = require('../models');
const { RegraNegocioErro } = require('../lib/erros');
const usuarioRepository = require('../repositories/usuario-repository');
const unidadeSaudeRepository = require('../repositories/unidade-saude-repository');
const secureRoles = require('../secure/roles');

exports.consultarConfiguracoes = async (req, res, next) => {
  try {
    const configs = await models.TenantConfig.findAll({
      include: [{
        attributes: ['id', 'nome'],
        model: models.Municipio,
      }],
    });
    return res.json({
      data: configs.map((c) => {
        const { Municipio, ...config } = c.dataValues;
        return { ...config, municipio: Municipio.nome };
      }),
    });
  } catch (err) {
    return next(err);
  }
};

const getConfigById = async (id) => {
  const config = await models.TenantConfig.findOne({
    where: { id },
    include: [{
      attributes: ['id', 'nome'],
      model: models.Municipio,
    },
    {
      attributes: ['id', 'municipioId'],
      model: models.TenantMunicipio,
      include: [{
        attributes: ['id', 'nome'],
        model: models.Municipio,
      }],
    },
    ],
  });
  if (!config) throw new RegraNegocioErro('Configuração do Tenant não encontrada.');

  const { Municipio, TenantMunicipios = [], ...values } = config.dataValues;
  const municipios = TenantMunicipios.map((m) => {
    const { Municipio: fMunicipio, ...others } = m.dataValues;
    return { ...others, municipio: fMunicipio.nome };
  });
  return { ...values, municipio: Municipio.nome, municipios };
};

exports.getConfigById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const config = await getConfigById(id);
    return res.json({ data: config });
  } catch (err) {
    return next(err);
  }
};

const cadastrarUnidadeSaude = async (tenant, unidadeSaude) => unidadeSaudeRepository
  .cadastraUnidade(tenant, unidadeSaude);

const cadastrarUsuario = async (tenant, usuario) => {
  const permissoes = [
    secureRoles.values.SecretariaSaude,
    secureRoles.values.AlteraEvolucao,
    secureRoles.values.Fechamento,
  ];
  return usuarioRepository.criarUsuario(tenant, { ...usuario, permissoes });
};

exports.cadastrarConfiguracao = async (req, res, next) => {
  try {
    const {
      nome, email, municipioId, periodo, municipio, cnes, tokenSecretaria, municipios = [],
    } = req.body;
    const config = await models.TenantConfig.create({
      nome, email, municipioId, periodo, cnes, tokenSecretaria,
    });
    await models.TenantMunicipio.bulkCreate(municipios.map((m) => ({
      configId: config.id,
      municipioId: m.municipioId,
    })));
    const unidadeSaude = await cadastrarUnidadeSaude(
      municipioId, { nome: `SMS ${municipio}`, cnes },
    );
    await cadastrarUsuario(municipioId, {
      nome,
      email,
      unidadeSaudeId: unidadeSaude.id,
    });

    return res.status(201).send();
  } catch (err) {
    return next(err);
  }
};

exports.atualizarConfiguracao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nome, email, municipioId, periodo, municipios = [],
    } = req.body;
    const config = await models.TenantConfig.findOne({
      where: { id },
    });

    await models.TenantConfig.update({
      nome,
      email,
      municipioId,
      periodo,
      dtBloqueioFechamento: moment(),
      ultimoPeriodo: config.periodo,
    }, { where: { id } });

    const novosMunicipios = municipios.filter((m) => !m.id);
    await models.TenantMunicipio.bulkCreate(novosMunicipios.map((m) => ({
      configId: config.id,
      municipioId: m.municipioId,
    })));

    const configAtualizada = await getConfigById(id);

    return res.json({ data: configAtualizada });
  } catch (err) {
    return next(err);
  }
};

exports.removerMunicipio = async (req, res, next) => {
  try {
    const { id } = req.params;
    await models.TenantMunicipio.destroy({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
