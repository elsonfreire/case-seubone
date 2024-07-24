import { useState, useTransition } from "react";

const Form = ({ products, setProducts }) => {
  const [newProductSku, setNewProductSku] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");

  const addProduct = (event) => {
    event.preventDefault();

    const productObject = { sku: newProductSku, quantity: newProductQuantity };
    console.log(productObject);
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

  return (
    <form onSubmit={addProduct}>
      <input
        value={newProductSku}
        onChange={handleProductSkuChange}
        placeholder="SKU"
      />
      <input
        value={newProductQuantity}
        onChange={handleProductQuantityChange}
        placeholder="Quantidade"
      />
      <button type="submit">add</button>
    </form>
  );
};

const Products = ({ products }) => {
  const getProductsListItems = () => {
    return products.map((product) => {
      return (
        <li key={product.sku}>
          {product.sku} {product.quantity}
        </li>
      );
    });
  };

  return <ul>{getProductsListItems()}</ul>;
};

const Layout = () => {
  const [products, setProducts] = useState([
    {
      sku: "TR.BD.PA.2A",
      quantity: 30,
    },
  ]);

  return (
    <>
      <h1>Criar venda</h1>
      <Form products={products} setProducts={setProducts} />
      <Products products={products} />
    </>
  );
};

export default Layout;
