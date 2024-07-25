import axios from "axios";

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

const salesServices = createService(salesUrl);
const requestsServices = createService(requestsUrl);

export { salesServices, requestsServices };
