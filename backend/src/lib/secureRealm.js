exports.isRealmSecretariaSaude = (token) => token.hasRole('realm:SECRETARIA_SAUDE');

exports.isRealmFechamento = (token) => token.hasRole('realm:FECHAMENTO');
