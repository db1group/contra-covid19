const { normalizarTexto } = require('../../../../src/lib/normalizar-texto');

describe('normalizar texto', async () => {
    it('todas as letras devem ficar maiúsculas', async () => {
        const frase = 'Uma frase que deveria ficar caixa alta';
        const normalizacaoEsperada = 'UMA FRASE QUE DEVERIA FICAR CAIXA ALTA';

        const result = normalizarTexto(frase);

        expect(result).toBe(normalizacaoEsperada);
    })
})