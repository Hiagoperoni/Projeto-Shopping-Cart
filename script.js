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

const somatorio = document.querySelector('.cart');
const sectionSomatorio = document.createElement('section');
sectionSomatorio.className = 'total-price';
sectionSomatorio.innerText = 'Valor Total: 0';
somatorio.appendChild(sectionSomatorio);

const localDoCarrinho = document.querySelector('.cart');
const filhosLocalDoCarrinho = localDoCarrinho.children[0];
const itensDoCarrinho = filhosLocalDoCarrinho.children;

const botaoEsvaziar = document.querySelector('.empty-cart');

const somarItensDoCarrinho = () => {
  const valorItens = document.getElementsByClassName('valorItem');
  const sessaoSomatorio = document.querySelector('.total-price');
  const somartodos = [];
  const ble = [...valorItens];
  ble.forEach((umItemzinho) => {
    const textoDoItem = umItemzinho.innerText;
    const formatacao = textoDoItem.substring(textoDoItem.indexOf('$') + 1);
    const valorDoItemzinho = parseFloat(formatacao);
    somartodos.push(valorDoItemzinho);
  });
  const valorTotalDoSomatorio = somartodos.reduce((acc, curr) => curr + acc, 0);
  const resultado = Math.round(valorTotalDoSomatorio * 100) / 100;
  sessaoSomatorio.innerText = resultado;
};

botaoEsvaziar.addEventListener('click', async () => {
  const ol = document.querySelector('ol');
  ol.innerHTML = '';
  somarItensDoCarrinho();
  saveCartItems(document.querySelector('ol'));
});

const cartItemClickListener = async (event) => {
  const itemEscolhido = event.currentTarget;
  await itemEscolhido.remove();
  somarItensDoCarrinho();
  saveCartItems(document.querySelector('ol'));
};

const excluirDoCarrinho = async () => {
  // await itensDoCarrinho.forEach((itemExcluir) => 
  for (let i = 0; i < itensDoCarrinho.length; i += 1) {
    itensDoCarrinho[i].addEventListener('click', cartItemClickListener);
  }
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item valorItem';
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
  botaoItemEscolhido.forEach((umItem) => {
    umItem.addEventListener('click', async (evento) => {
      const picked = evento.currentTarget;
      await refatorarCarrinho(picked);
      somarItensDoCarrinho();
      saveCartItems(document.querySelector('ol'));
    });
  });
};
const localPaiParaDevolverOsSalvos = document.querySelector('ol');

const paraRetomar = () => {
  localPaiParaDevolverOsSalvos.innerHTML = getSavedCartItems();
  somarItensDoCarrinho();
};

window.onload = async () => { 
  await retornarItens(); 
  adicionarAoCarrinho();
  somarItensDoCarrinho();
  paraRetomar();
  excluirDoCarrinho();
};
