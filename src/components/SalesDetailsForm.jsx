import { useEffect, useState } from "react";
import {
  calculateTotalPrice,
  calculateMaxDiscount,
} from "../util/calculations";
import { requestsServices, salesServices } from "../services/sales";

const SaleDetailsForm = ({ products, setProducts }) => {
  const [shipping, setShipping] = useState("ne");
  const [delivery, setDelivery] = useState("default");
  const [discount, setDiscount] = useState("");
  const [saleValue, setSaleValue] = useState("");

  const getSaleObject = () => {
    const sale = {
      products,
      shipping,
      delivery,
      discount: Number(discount),
    };

    if (isNaN(discount)) {
      sale.discount = 0;
    }

    return sale;
  };

  const validateProducts = () => {
    if (!products || products.length === 0) {
      alert("Adicione algum produto");
      return false;
    }
    return true;
  };

  const validateDiscount = () => {
    const sale = getSaleObject();
    const maxDiscount = calculateMaxDiscount(sale);
    if (sale.discount > maxDiscount) {
      alert("Desconto excedeu o permitido. Solicitação de venda foi enviada");
      return false;
    }
    return true;
  };

  const createSale = (event) => {
    event.preventDefault();

    if (!validateProducts()) {
      return;
    }

    const sale = getSaleObject();

    if (!validateDiscount()) {
      requestsServices.create(sale);
      return;
    }

    salesServices.create(sale);

    setProducts([]);
    setShipping("ne");
    setDelivery("default");
    setDiscount("");

    alert("Venda criada com sucesso");
  };

  useEffect(() => {
    const sale = getSaleObject();
    setSaleValue(calculateTotalPrice(sale));
  }, [products, shipping, delivery, discount]);

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    setDelivery(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  return (
    <form onSubmit={createSale}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="shipping">Frete: </label>
            </td>
            <td>
              <select
                value={shipping}
                onChange={handleShippingChange}
                id="shipping"
              >
                <option value="ne">Nordeste</option>
                <option value="n">Norte</option>
                <option value="co">Centro-Oeste</option>
                <option value="s">Sul</option>
                <option value="se">Sudeste</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="delivery">Prazo: </label>
            </td>
            <td>
              <select
                value={delivery}
                onChange={handleDeliveryChange}
                id="delivery"
                required
              >
                <option value="default">Padrão</option>
                <option value="turbo">Turbo</option>
                <option value="super">Super Turbo</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="discount">Desconto: R$ </label>
            </td>
            <td>
              <input
                type="number"
                value={discount}
                onChange={handleDiscountChange}
                id="discount"
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Valor total: R$ {saleValue}</h3>
      <button type="submit">Criar venda</button>
    </form>
  );
};

export default SaleDetailsForm;
