require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  test('Verifica a função fetchItem é chamada passando um argumento', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalled();
  });
  test('Verifica se ao chamar a função fetchProducts com o argumento (computador) retorna o endpoint correto', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test('Verifica se ao chamar a função fetchProducts com o argumento (computador) retorna a estrutura certa', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro', async () => {
    expect(await fetchItem()).toEqual('You must provide an url');
  });
});
