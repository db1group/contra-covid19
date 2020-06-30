const camposControleLeitos = (leitos) => {
  const {
    qtEnfermariaCovid,
    qtUTIAdultaCovid,
    qtUTIPedCovid,
    qtUTINeoCovid,
    qtEnfermariaNormal,
    qtUTIAdultaNormal,
    qtUTIPedNormal,
    qtUTINeoNormal,
    qtEnfermariaPrivado,
    qtUTIAdultaPrivado,
    qtUTIPedPrivado,
    qtUTINeoPrivado,
  } = leitos;
  return {
    qtEnfermariaCovid,
    qtUTIAdultaCovid,
    qtUTIPedCovid,
    qtUTINeoCovid,
    qtEnfermariaNormal,
    qtUTIAdultaNormal,
    qtUTIPedNormal,
    qtUTINeoNormal,
    qtEnfermariaPrivado,
    qtUTIAdultaPrivado,
    qtUTIPedPrivado,
    qtUTINeoPrivado,
  };
};

exports.camposControleLeitos = camposControleLeitos;

exports.leitosDisponiveis = (controleLeitos, leitosUnidade) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(camposControleLeitos(leitosUnidade))) {
    if (controleLeitos[key] > leitosUnidade[key]) return false;
  }
  return true;
};
