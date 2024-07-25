import { useEffect, useState } from "react";
import { requestsServices, salesServices } from "../services/sales";
import {
  calculateMaxDiscount,
  calculateTotalPrice,
} from "../util/calculations";
import productsService from "../services/products";

const ProductsForm = ({ products, setProducts }) => {
  const [newProductSku, setNewProductSku] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  const addProduct = (event) => {
    event.preventDefault();

    if (!productsService.getProductBySku(newProductSku)) {
      alert("Esse SKU não existe");
      return;
    }

    if (
      products &&
      products.some((product) => {
        return product.sku === newProductSku;
      })
    ) {
      alert("Esse SKU já foi adicionado");
      return;
    }

    const productObject = { sku: newProductSku, quantity: newProductQuantity };
    setProducts(products.concat(productObject));

    setNewProductSku("");
    setNewProductQuantity("");
  };

  const handleProductQuantityChange = (event) => {
    setNewProductQuantity(event.target.value);
  };

  const handleProductSkuChange = (event) => {
    setNewProductSku(event.target.value);
  };

  useEffect(() => {
    const product = productsService.getProductBySku(newProductSku);

    if (!product) {
      setNewProductDescription("Esse SKU não existe");
      return;
    }
    setNewProductDescription(product.produto);
  }, [newProductSku]);

  return (
    <>
      <form onSubmit={addProduct}>
        <input
          value={newProductSku}
          onChange={handleProductSkuChange}
          placeholder="SKU"
        />
        <p>{newProductDescription}</p>
        <input
          value={newProductQuantity}
          onChange={handleProductQuantityChange}
          placeholder="Quantidade"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

const Products = ({ products }) => {
  const getProductsListItems = () => {
    return products.map((product) => {
      return (
        <li key={product.sku}>
          SKU: {product.sku} QTD: {product.quantity}
        </li>
      );
    });
  };

  return (
    <>
      <ul>
        {products.length > 0 ? (
          getProductsListItems()
        ) : (
          <p>Nenhum produto foi adicionado</p>
        )}
      </ul>
    </>
  );
};

const Layout = () => {
  const [products, setProducts] = useState([]);
  const [shipping, setShipping] = useState("");
  const [delivery, setDelivery] = useState("default");
  const [discount, setDiscount] = useState("");
  const [saleValue, setSaleValue] = useState(0);

  const getSaleObject = () => {
    const sale = {
      products,
      shipping,
      delivery,
      discount,
    };
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
      requestsServices.create(sale).then((response) => {
        console.log(response);
      });
    }

    salesServices.create(sale);

    setProducts([]);
    setShipping("");
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
    <>
      <h1>Criar venda</h1>
      <h3>Produtos:</h3>
      <ProductsForm products={products} setProducts={setProducts} />
      <Products products={products} />
      <h3>Detalhes:</h3>
      <form onSubmit={createSale}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="shipping">Frete: </label>
              </td>
              <td>
                <input
                  value={shipping}
                  onChange={handleShippingChange}
                  id="shipping"
                  required
                />
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
    </>
  );
};

export default Layout;
