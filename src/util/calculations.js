import productsService from "../services/products";

const calculateProductsSum = (products) => {
  let productsSum = 0;

  products.forEach((product) => {
    const productPrice = productsService.getProductPriceBySku(product.sku);
    productsSum += productPrice * Number(product.quantity);
  });

  return productsSum;
};

const calculateMaxDiscount = (sale) => {
  const productsSum = calculateProductsSum(sale.products);

  const percentageMap = {
    default: 0.05,
    turbo: 0.1,
    super: 0.2,
  };

  const percentage = percentageMap[sale.delivery];

  const maxDiscount = Math.max(sale.shipping, percentage * productsSum);
  return maxDiscount;
};

const calculateTotalPrice = (sale) => {
  const productsSum = calculateProductsSum(sale.products);

  const additionalMap = {
    default: 0,
    turbo: 0.1,
    super: 0.2,
  };
  const additionalPercentage = additionalMap[sale.delivery];
  const deliveryAdditional = productsSum * additionalPercentage;

  const total =
    productsSum +
    Number(sale.shipping) +
    deliveryAdditional -
    Number(sale.discount);

  return total;
};

const calculateShipping = (region) => {
  const regionFactor = {
    n: 10,
    ne: 0,
    co: 15,
    se: 20,
    s: 30,
  };

  const productsQuantity = 0;
  //pegar  a qtdd
  return regionFactor[region] * productsQuantity;
};

export { calculateMaxDiscount, calculateTotalPrice };
