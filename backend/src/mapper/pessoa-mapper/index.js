const mapearParaModel = (pessoaRequest) => {
    return pessoa = {
        pessoaId: pessoaRequest.pessoaId ? pessoaRequest : undefined,
        ...pessoaRequest,
    }
}

const mapearParaSuspeito = ({ id, ...pessoa }) => {
    const response = {
        pessoaId: id,
        ...pessoa,
    };
    return response;
}

module.exports = PessoasMapper = { mapearParaModel, mapearParaSuspeito };