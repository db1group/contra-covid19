const dicionarioValores = require('../models/dicionario-valores');

class EnviarNotificacaoRequest {

    constructor() {
        this.possui_cpf = dicionarioValores.possuiCpf.NaoInformado;
    }

}

module.exports = EnviarNotificacaoRequest;