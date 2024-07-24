import { useEffect, useState } from "react";
import saleService from "../services/sales";

const Sale = ({ sale }) => {
  const getProductsListItems = () => {
    return sale.products.map((product) => {
      return (
        <li key={product.sku}>
          SKU: {product.sku} QTD: {product.quantity}
        </li>
      );
    });
  };

  return (
    <>
      <h3>ID: {sale.id}</h3>
      <ul>
        <li>
          Produtos: <ul>{getProductsListItems()}</ul>
        </li>
        <li>Frete: {sale.shipping}</li>
        <li>Prazo: {sale.delivery}</li>
        <li>Desconto: {sale.discount}</li>
      </ul>
    </>
  );
};

const SalesList = ({ sales }) => {
  const getSales = () => {
    return sales.map((sale) => {
      return <Sale sale={sale}></Sale>;
    });
  };

  return <div>{getSales()}</div>;
};

const Layout = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    saleService.getAll().then((response) => {
      setSales(response);
    });
  }, []);

  return (
    <>
      <h1>Vendas </h1>
      <SalesList sales={sales} />
    </>
  );
};

export default Layout;
