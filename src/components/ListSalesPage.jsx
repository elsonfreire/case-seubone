import React, { useEffect, useState } from "react";
import { salesServices } from "../services/sales";
import ItemList from "../components/common/ItemList";

const SalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    salesServices.getAll().then((response) => {
      setSales(response);
    });
  }, []);

  const handleDeleteSale = (id) => {
    if (!window.confirm(`Deseja mesmo excluir a venda de ID ${id}?`)) {
      return;
    }

    salesServices.remove(id).then((response) => {
      setSales(sales.filter((sale) => sale.id !== response.id));
    });
  };

  const actions = [
    {
      text: "Excluir venda",
      handler: handleDeleteSale,
    },
  ];

  return (
    <>
      <h1>Vendas</h1>
      <ItemList items={sales} actions={actions} />
    </>
  );
};

export default SalesPage;
