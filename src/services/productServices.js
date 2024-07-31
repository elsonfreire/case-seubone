export const getProductBySku = (codigoSku) => {
  const product = SKUs.find((sku) => {
    return sku.SKU === codigoSku;
  });

  if (product) {
    return product;
  } else {
    return null;
  }
};

const getProductPriceBySku = (codigoSku) => {
  const product = getProductBySku(codigoSku);
  return product.preco_cheio;
};

export default {
  getProductBySku,
  getProductPriceBySku,
};

const SKUs = [
  {
    SKU: "ABC.01",
    produto: "Produto 1",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.02",
    produto: "Produto 2",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.03",
    produto: "Produto 3",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.04",
    produto: "Produto 4",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.05",
    produto: "Produto 5",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.06",
    produto: "Produto 6",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.07",
    produto: "Produto 7",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.08",
    produto: "Produto 8",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.09",
    produto: "Produto 9",
    preco_cheio: 33.9,
  },
  {
    SKU: "ABC.10",
    produto: "Produto 10",
    preco_cheio: 33.9,
  },
];
