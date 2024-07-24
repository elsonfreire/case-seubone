import axios from "axios";

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

const calculateTotalPrice = (sale) => {
  let total = 0;
  sale.products.forEach((product) => {
    console.log(product);
    const productPrice = 1; //pegar do arquivo products.js
    total += productPrice * product.quantity;
  });

  return total;
};

export default {
  getAll,
  create,
  update,
  remove,
  calculateTotalPrice,
};
