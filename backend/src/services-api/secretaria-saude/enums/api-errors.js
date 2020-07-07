const jaExisteFichaAberta = 'Já existe uma ficha aberta para o paciente';

exports.isFichaJaExiste = (error) => error.paciente
        && error.paciente.indexOf(jaExisteFichaAberta) !== -1;
