// const fetch = require('node-fetch');

const fetchProducts = async (busca) => {
  if (!busca) {
    throw new Error('You must provide an url');
  }
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await response.json();
  return data;
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
