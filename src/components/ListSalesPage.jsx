import { useEffect, useState } from "react";
import { salesServices } from "../services/sales";
import SaleInfo from "./SaleInfo";

const Sale = ({ sale, handleDeleteSale }) => {
  return (
    <div className="sale-item">
      <SaleInfo sale={sale} />
      <button onClick={handleDeleteSale}>Excluir venda</button>
    </div>
  );
};

const SalesList = ({ sales, handleDeleteSale }) => {
  const getSales = () => {
    return sales.map((sale) => {
      return (
        <Sale
          key={sale.id}
          sale={sale}
          handleDeleteSale={() => {
            handleDeleteSale(sale.id);
          }}
        />
      );
    });
  };

  return (
    <div className="sale-list">
      {sales.length > 0 ? getSales() : <p>Nenhum produto foi adicionado</p>}
    </div>
  );
};

const Layout = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    salesServices.getAll().then((response) => {
      setSales(response);
    });
  }, []);

  const handleDeleteSale = (id) => {
    if (!window.confirm(`Deseja mesmo excluir o pedido de ID ${id}?`)) {
      return;
    }

    salesServices.remove(id).then((response) => {
      setSales(
        sales.filter((sale) => {
          return sale.id !== response.id;
        })
      );
    });
  };

  return (
    <>
      <h1>Vendas </h1>
      <SalesList sales={sales} handleDeleteSale={handleDeleteSale} />
    </>
  );
};

export default Layout;
