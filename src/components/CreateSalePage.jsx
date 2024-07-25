import { useEffect, useState } from "react";
import {
  salesServices,
  calculateMaxDiscount,
  calculateTotalPrice,
} from "../services/sales";
import productsService from "../services/products";

const ProductsForm = ({ products, setProducts }) => {
  const [newProductSku, setNewProductSku] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  const addProduct = (event) => {
    event.preventDefault();

    if (!productsService.getProductBySku(newProductSku)) {
      alert("Não existe produto com esse SKU");
      return;
    }

    if (
      products &&
      products.some((product) => {
        return product.sku === newProductSku;
      })
    ) {
      alert("SKU repetido");
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
      setNewProductDescription("Não existe produto com esse SKU");
      return;
    }
    setNewProductDescription(product.produto);
  }, [newProductSku]);

  return (
    <>
      <h3>Produtos:</h3>
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

  const createSale = (event) => {
    event.preventDefault();

    const sale = getSaleObject();

    const maxDiscount = calculateMaxDiscount(sale);
    if (sale.discount > maxDiscount) {
      console.log(
        `desconto ${sale.discount} grande demais. maximo = ${maxDiscount}`
      );

      //
    }

    salesServices.create(sale);

    setProducts([]);
    setShipping("");
    setDelivery("default");
    setDiscount("");
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
      <ProductsForm products={products} setProducts={setProducts} />
      <Products products={products} />
      <form onSubmit={createSale}>
        <div>
          <label htmlFor="shipping">Frete: </label>
          <input
            value={shipping}
            onChange={handleShippingChange}
            id="shipping"
          />
        </div>
        <div>
          <label htmlFor="delivery">Prazo: </label>
          <select
            value={delivery}
            onChange={handleDeliveryChange}
            id="delivery"
          >
            <option value="default">Padrão</option>
            <option value="turbo">Turbo</option>
            <option value="super">Super Turbo</option>
          </select>
        </div>
        <div>
          <label htmlFor="discount">Desconto: </label>
          <input
            value={discount}
            onChange={handleDiscountChange}
            id="discount"
          />
        </div>
        <h3>Valor total: R$ {saleValue}</h3>
        <button type="submit">Criar venda</button>
      </form>
    </>
  );
};

export default Layout;
