import React from "react";
import { calculateTotalPrice } from "../../util/calculations";

const ItemInfo = ({ item }) => {
  const getProductsListItems = () => {
    return item.products.map((product) => {
      return (
        <li key={product.sku}>
          SKU: {product.sku} QTD: {product.quantity}
        </li>
      );
    });
  };

  return (
    <div>
      <h3>ID: {item.id}</h3>
      <ul>
        <li>
          Produtos: <ul>{getProductsListItems()}</ul>
        </li>
        <li>Frete: {item.shipping}</li>
        <li>Prazo: {item.delivery}</li>
        <li>Desconto: {item.discount}</li>
      </ul>
      <h3>Valor total: R$ {calculateTotalPrice(item)}</h3>
    </div>
  );
};

const Item = ({ item, actions }) => {
  return (
    <div className="item">
      <ItemInfo item={item} />
      {actions.map((action, index) => (
        <button key={index} onClick={() => action.handler(item.id)}>
          {action.text}
        </button>
      ))}
    </div>
  );
};

const ItemList = ({ items, actions }) => {
  const renderItems = () => {
    return items.map((item) => (
      <Item key={item.id} item={item} actions={actions} />
    ));
  };

  return (
    <div className="item-list">
      {items.length > 0 ? renderItems() : <p>Nenhum item encontrado</p>}
    </div>
  );
};

export default ItemList;
