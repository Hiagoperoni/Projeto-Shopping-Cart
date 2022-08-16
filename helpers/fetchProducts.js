// const fetch = require('node-fetch');

const fetchProducts = async (busca) => {
  try {
    if (!busca) {
      throw new Error('You must provide an url');
    }
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${busca}`);
    const data = await response.json();
    return data;
  } catch (Error) {
    return 'You must provide an url';
  }
};

// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
