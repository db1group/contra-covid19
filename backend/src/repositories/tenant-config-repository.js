const moment = require('moment');
const models = require('../models');

const CACHE_KEY = '/tenantConfig/';

const getFechamentoConfig = async (tenant) => models.TenantConfig.findOne({
  where: { municipioId: tenant },
  include: [{
    attributes: ['id', 'municipioId'],
    model: models.TenantMunicipio,
  }],
});

const getMunicipios = (tenantConfig) => {
  if (!tenantConfig) return [];
  return tenantConfig.TenantMunicipios.map((m) => m.municipioId);
};

const getPeriodoFechamento = (config) => (dataFechamento) => {
  const TEMPO_FINAL = 59;
  const [horas, minutos] = config.periodo.toString().split(':');
  const dtInicial = moment(dataFechamento)
    .startOf('day')
    .subtract(1, 'day')
    .add(+horas, 'hours')
    .add(+minutos, 'minutes')
    .toDate();
  const finalHour = +horas - 1;
  const finalMinutes = +minutos === 0 ? TEMPO_FINAL : +minutos - 1;
  const dtFinal = moment(dataFechamento)
    .startOf('day')
    .add(finalHour, 'hours')
    .add(finalMinutes, 'minutes')
    .add(TEMPO_FINAL, 'seconds')
    .toDate();
  return [dtInicial, dtFinal];
};

const getTenantConfig = async (req, tenant) => {
  const cacheKey = `${CACHE_KEY}${tenant}`;
  let tenantConfig = await req.getCacheByKey(cacheKey);
  let config;
  if (tenantConfig) {
    config = JSON.parse(tenantConfig);
    config.getPeriodoFechamento = getPeriodoFechamento(config);
    return config;
  }
  tenantConfig = await getFechamentoConfig(tenant);
  config = tenantConfig.get({ plain: true });
  config.municipios = getMunicipios(config);
  delete config.TenantMunicipios;
  await req.setCacheByKeyWithoutEx(cacheKey, JSON.stringify(config));
  config.getPeriodoFechamento = getPeriodoFechamento(config);
  return config;
};

const removeCacheConfigKey = (req, tenant) => {
  const cacheKey = `${CACHE_KEY}${tenant}`;
  req.removeCacheByKey(cacheKey);
};

exports.getFechamentoConfig = getFechamentoConfig;
exports.getTenantConfig = getTenantConfig;
exports.removeCacheConfigKey = removeCacheConfigKey;
