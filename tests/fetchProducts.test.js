require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  test('Verifica a função fetchProducts é chamada passando um argumento', async () => {
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  });
  test('Verifica se ao chamar a função fetchProducts com o argumento (computador) retorna o endpoint correto', () => {
    expect(fetchProducts('computador'))
  });
  test('Verifica se ao chamar a função fetchProducts com o argumento (computador) retorna a estrutura certa', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  test('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro', async () => {
    expect(await fetchProducts()).toEqual('You must provide an url');
  });
});
