import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../../util/calculations";

const ItemFilter = ({ items, setItems }) => {
  const [order, setOrder] = useState("descending");

  const handleFilterChange = (event) => {
    setOrder(event.target.value);
  };

  useEffect(() => {
    const orderedItems = [...items];

    if (order === "ascending") {
      orderedItems.sort((a, b) => {
        return calculateTotalPrice(a) - calculateTotalPrice(b);
      });
    } else {
      orderedItems.sort((a, b) => {
        return calculateTotalPrice(b) - calculateTotalPrice(a);
      });
    }

    console.log(orderedItems);

    setItems(orderedItems);
  }, [order]);

  return (
    <>
      <label htmlFor="items-filter">Ordenar por </label>
      <select value={order} onChange={handleFilterChange} id="items-filter">
        <option value="ascending">{"valor total (crescente)"}</option>
        <option value="descending">{"valor total (decrescente)"}</option>
      </select>
    </>
  );
};

export default ItemFilter;
