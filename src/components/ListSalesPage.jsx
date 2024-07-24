import { useEffect, useState } from "react";
import saleService from "../services/sales";
import "../index.css";

const Sale = ({ sale, handleDeleteSale }) => {
  const saleStyle = {
    border: "solid 1px",
    padding: "30px",
    margin: "5px",
    width: "24%",
  };

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
    <div style={saleStyle}>
      <h3>ID: {sale.id}</h3>
      <ul>
        <li>
          Produtos: <ul>{getProductsListItems()}</ul>
        </li>
        <li>Frete: {sale.shipping}</li>
        <li>Prazo: {sale.delivery}</li>
        <li>Desconto: {sale.discount}</li>
      </ul>
      <h3>Valor total: {saleService.calculateTotalPrice(sale)}</h3>
      <button onClick={handleDeleteSale}>Excluir venda</button>
    </div>
  );
};

const SalesList = ({ sales, handleDeleteSale }) => {
  const salesStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

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
    <div style={salesStyle}>
      {sales.length > 0 ? getSales() : <p>Nenhum produto foi adicionado</p>}
    </div>
  );
};

const Layout = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    saleService.getAll().then((response) => {
      setSales(response);
    });
  }, []);

  const handleDeleteSale = (id) => {
    if (!window.confirm(`Deseja mesmo excluir o pedido de ID ${id}?`)) {
      return;
    }

    saleService.remove(id).then((response) => {
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
