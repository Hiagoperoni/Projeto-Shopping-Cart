// const fetch = require('node-fetch');

const fetchItem = async (id) => {
  const searchedItem = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const searchedData = await searchedItem.json();
  return searchedData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
