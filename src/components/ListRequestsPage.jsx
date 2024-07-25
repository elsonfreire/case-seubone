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

  const handleApproveRequest = (id) => {
    if (!window.confirm(`Deseja mesmo aprovar a solicitação de ID ${id}?`)) {
      return;
    }

    const approvedSale = requests.find((request) => {
      return request.id === id;
    });

    const { id: requestId, ...approvedSaleWithoutId } = approvedSale;

    salesServices.create(approvedSaleWithoutId);

    requestsServices.remove(id);

    setRequests(
      requests.filter((request) => {
        return request.id !== id;
      })
    );
  };

  const handleDeleteRequest = (id) => {
    if (!window.confirm(`Deseja mesmo recusar a solicitação de ID ${id}?`)) {
      return;
    }

    requestsServices.remove(id).then((response) => {
      setRequests(requests.filter((request) => request.id !== response.id));
    });
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
      <ItemList items={requests} actions={actions} />
    </>
  );
};

export default RequestsPage;
