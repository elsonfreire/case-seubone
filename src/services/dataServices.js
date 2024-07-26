import axios from "axios";

const usersUrl = "http://localhost:3001/users";
const salesUrl = "http://localhost:3001/sales";
const requestsUrl = "http://localhost:3001/requests";

const createService = (baseUrl) => {
  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  };

  const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  return {
    getAll,
    create,
    update,
    remove,
  };
};

const usersServices = createService(usersUrl);
const salesServices = createService(salesUrl);
const requestsServices = createService(requestsUrl);

export { usersServices, salesServices, requestsServices };
