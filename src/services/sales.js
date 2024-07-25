import axios from "axios";
import productsService from "./products";

const salesUrl = "http://localhost:3001/sales";
const requestsUrl = "http://localhost:3001/requests";

const createService = (baseUrl) => {
  const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  };

  const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
  };

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
  };

  const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => {
      return response.data;
    });
  };
  return {
    getAll,
    create,
    update,
    remove,
  };
};

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

const salesServices = createService(salesUrl);
const requestsServices = createService(requestsUrl);

export {
  salesServices,
  requestsServices,
  calculateTotalPrice,
  calculateMaxDiscount,
};
