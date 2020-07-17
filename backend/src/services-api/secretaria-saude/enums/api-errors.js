const jaExisteFichaAberta = 'Já existe uma ficha aberta para o paciente';

exports.isFichaJaExiste = (error) => error.paciente
  && error.paciente.indexOf(jaExisteFichaAberta) !== -1;

exports.isCPFJaExiste = (error) => error.cpf
  && /Já existe uma ficha aberta para este CPF/.test(error.cpf);

exports.isIdNaoEncontrado = (error) => error.id
  && /notificação com id [0-9]+ não foi encontada!/.test(error.id);
