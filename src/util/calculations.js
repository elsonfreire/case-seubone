import productsService from "../services/productServices";

const calculateProductsSum = (products) => {
  let productsSum = 0;

  products.forEach((product) => {
    const productPrice = productsService.getProductPriceBySku(product.sku);
    productsSum += productPrice * product.quantity;
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

  const maxDiscount = Math.max(
    calculateShipping(sale),
    percentage * productsSum
  );
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
    calculateShipping(sale) +
    deliveryAdditional -
    Number(sale.discount);

  return total;
};

const getQuantityOfProducts = (products) => {
  let quantity = 0;

  products.forEach((product) => {
    quantity += product.quantity;
  });

  return quantity;
};

const calculateShipping = (sale) => {
  const region = sale.shipping;

  const regionFactor = {
    norte: 1,
    nordeste: 0,
    centrooeste: 1.5,
    sudeste: 2,
    sul: 3,
  };

  return regionFactor[region] * getQuantityOfProducts(sale.products);
};

export { calculateMaxDiscount, calculateTotalPrice, calculateShipping };
