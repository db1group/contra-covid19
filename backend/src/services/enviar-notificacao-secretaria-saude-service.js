const secretariaSaudeApi = require('../services-api/secretaria-saude/service');
const EnviarNotificacaoRequest = require('../services-api/secretaria-saude/models/enviar-notificacao-request');

exports.handle = async () => {

    const request = new EnviarNotificacaoRequest();
    const json = JSON.stringify(request);
}

const mapToModelRequest = (notificacaoModel) => {
    var request = {
        'data_notificacao': '',
        'possui_cpf': '',
        'tipo_paciente': '',
        'paciente': '',
        'sexo': '',
        'data_nascimento': '',
        'nome_mae': '',
        'uf_residencia': '',
        'ibge_residencia': '',
        'cnes_unidade_notifica': '',
        'nome_notificador': '',
        'raca_cor': '',
        'assintomatico': '',
        'data_1o_sintomas': '',
    }
}