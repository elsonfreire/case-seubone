import { calculateTotalPrice } from "../services/sales";

const SaleInfo = ({ sale }) => {
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
    <div>
      <h3>ID: {sale.id}</h3>
      <ul>
        <li>
          Produtos: <ul>{getProductsListItems()}</ul>
        </li>
        <li>Frete: {sale.shipping}</li>
        <li>Prazo: {sale.delivery}</li>
        <li>Desconto: {sale.discount}</li>
      </ul>
      <h3>Valor total: R$ {calculateTotalPrice(sale)}</h3>
    </div>
  );
};

export default SaleInfo;
