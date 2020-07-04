let jaExisteFichaAberta = 'Já existe uma ficha aberta para o paciente';

exports.isFichaJaExiste = (error) => {
    return error.paciente
        && error.paciente.indexOf(jaExisteFichaAberta) !== -1;
}