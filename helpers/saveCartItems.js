const saveCartItems = (param) => {
  const salvarValores = param;
  let texto = '';
  const blu = salvarValores.childNodes;
  for (let i = 0; i < blu.length; i += 1) {
    localStorage.setItem('cartItems', texto += blu[i].outerHTML);
}
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
