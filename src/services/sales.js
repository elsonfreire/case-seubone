import axios from "axios";
import productsService from "./products";

const baseUrl = "http://localhost:3001/sales";

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

  let percentage = 0;
  if (sale.delivery === "default") {
    percentage = 0.05;
  } else if (sale.delivery === "turbo") {
    percentage = 0.1;
  } else if (sale.delivery === "super") {
    percentage = 0.2;
  }

  const maxDiscount = Math.max(sale.shipping, percentage * productsSum);
  return maxDiscount;
};

const calculateTotalPrice = (sale) => {
  const productsSum = calculateProductsSum(sale.products);

  let deliveryAdditional = 0;
  if (sale.delivery === "turbo") {
    deliveryAdditional = productsSum * 0.1;
  } else if (sale.delivery === "super") {
    deliveryAdditional = productsSum * 0.2;
  }

  const total =
    productsSum +
    Number(sale.shipping) +
    deliveryAdditional -
    Number(sale.discount);

  return total;
};

export default {
  getAll,
  create,
  update,
  remove,
  calculateTotalPrice,
  calculateMaxDiscount,
};
