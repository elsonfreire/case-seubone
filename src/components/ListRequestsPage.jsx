import React, { useEffect, useState } from "react";
import { salesServices, requestsServices } from "../services/sales";
import ItemList from "../components/common/ItemList";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    requestsServices.getAll().then((response) => {
      setRequests(response);
    });
  }, []);

  const deleteRequest = (id) => {
    requestsServices.remove(id);

    setRequests(
      requests.filter((request) => {
        return request.id !== id;
      })
    );
  };

  const handleApproveRequest = (id) => {
    if (!window.confirm(`Deseja mesmo aprovar a solicitação de ID ${id}?`)) {
      return;
    }

    const approvedSale = requests.find((request) => {
      return request.id === id;
    });

    const { id: requestId, ...approvedSaleWithoutId } = approvedSale;

    salesServices.create(approvedSaleWithoutId);

    deleteRequest(id);
  };

  const handleDeleteRequest = (id) => {
    if (!window.confirm(`Deseja mesmo recusar a solicitação de ID ${id}?`)) {
      return;
    }

    deleteRequest(id);
  };

  const actions = [
    {
      text: "Aprovar",
      handler: handleApproveRequest,
    },
    {
      text: "Recusar",
      handler: handleDeleteRequest,
    },
  ];

  return (
    <>
      <h1>Solicitações de venda</h1>
      <ItemList items={requests} setItems={setRequests} actions={actions} />
    </>
  );
};

export default RequestsPage;
