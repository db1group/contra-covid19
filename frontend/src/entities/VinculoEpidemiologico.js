export default class {
  constructor(data = {}) {
    return {
      situacao1: data.situacao1 || false,
      situacao2: data.situacao2 || false,
      nome: data.nome || '',
    };
  }
};
