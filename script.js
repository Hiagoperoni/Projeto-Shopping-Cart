// const { fetchProducts } = require('./helpers/fetchProducts');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const refatorarProdutos = async () => {
  const produtosResolve = await fetchProducts('computador');
  const products = produtosResolve.results;
  const listaProdutos = products.map((produtoAtual) => {
    const refatoraçãoProduto = {
    sku: produtoAtual.id,
    name: produtoAtual.title,
    image: produtoAtual.thumbnail,
    };
    return refatoraçãoProduto;
  });
  return listaProdutos;
};

const retornarItens = async () => {
  const sessaoItens = document.querySelector('.items');
  const listaDeRetorno = await refatorarProdutos();
  listaDeRetorno.forEach((item) => {
    sessaoItens.appendChild(createProductItemElement(item));
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const localDoCarrinho = document.querySelector('.cart');
const filhosLocalDoCarrinho = localDoCarrinho.children[0];
const itensDoCarrinho = filhosLocalDoCarrinho.children;

const cartItemClickListener = (event) => {
  const itemEscolhido = event.currentTarget;
  itemEscolhido.remove();
};

const excluirDoCarrinho = () => {
  const pickedQuit = itensDoCarrinho.forEach((itemExcluir) => {
    itemExcluir.addEventListener('click', cartItemClickListener);
  });
};

const somarCarrinho = async () => {

};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const refatorarCarrinho = async (produtoCarrinho) => {
  const localCarrinho = document.querySelector('.cart__items');
  const escolhido = produtoCarrinho.querySelector('.item__sku').innerText;
  const dados = await fetchItem(escolhido);
  const novoProduto = {
    sku: dados.id,
    name: dados.title,
    salePrice: dados.price,
  };
  localCarrinho.appendChild(createCartItemElement(novoProduto));
};

const adicionarAoCarrinho = async () => {
  const botaoItemEscolhido = document.querySelectorAll('.item');
  const pickedbutton = botaoItemEscolhido.forEach((umItem) => {
    umItem.addEventListener('click', (evento) => {
      const picked = evento.currentTarget;
      refatorarCarrinho(picked);
    });
  });
};

window.onload = async () => { 
  await retornarItens(); 
  adicionarAoCarrinho();
};
