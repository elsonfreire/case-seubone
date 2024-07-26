import React, { useEffect } from "react";
import { calculateTotalPrice } from "../../util/calculations";
import ItemFilter from "./ItemFilter";
import { getProductBySku } from "../../services/productServices";

const ItemInfo = ({ item }) => {
  const getProductsListItems = () => {
    return item.products.map((product) => {
      return (
        <li key={product.sku}>
          <strong>{product.quantity}x </strong>
          {getProductBySku(product.sku).produto}
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
      <h3>Valor total: R$ {calculateTotalPrice(item).toFixed(2)}</h3>
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

const ItemList = ({ items, setItems, actions }) => {
  const renderItems = () => {
    return items.map((item) => (
      <Item key={item.id} item={item} actions={actions} />
    ));
  };

  let renderedItems = renderItems();

  useEffect(() => {
    renderedItems = renderItems();
  }, [items]);

  return (
    <>
      <ItemFilter items={items} setItems={setItems} />
      <div className="item-list">
        {items.length > 0 ? renderedItems : <p>Nenhum item encontrado</p>}
      </div>
    </>
  );
};

export default ItemList;
