const saveCartItems = (param) => {
  const salvarValores = param;
  let texto = '';
  const blu = salvarValores.childNodes;
  blu.forEach((cadaFilho) => {
    localStorage.setItem('cartItems', texto += cadaFilho.outerHTML);
  });
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
