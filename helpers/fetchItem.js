// const fetch = require('node-fetch');

const fetchItem = async (id) => {
  try {
    if (!id) {
      throw new Error('You must provide an url');
    }
    const searchedItem = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const searchedData = await searchedItem.json();
  return searchedData;
  } catch (Error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
