import { useEffect, useState } from "react";
import productsService from "../services/productServices";

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

    if (isNaN(newProductQuantity) || newProductQuantity <= 0) {
      alert("Insira uma quantidade válida");
      return;
    }

    if (products && products.some((product) => product.sku === newProductSku)) {
      alert("Esse SKU já foi adicionado");
      return;
    }

    const productObject = {
      sku: newProductSku,
      quantity: Number(newProductQuantity),
    };
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
    <form onSubmit={addProduct}>
      <label htmlFor="sku">SKU: </label>
      <input
        value={newProductSku}
        onChange={handleProductSkuChange}
        placeholder="ABC.01"
        id="sku"
      />
      <p>{newProductDescription}</p>
      <label htmlFor="quantity">Quantidade: </label>
      <input
        type="number"
        value={newProductQuantity}
        onChange={handleProductQuantityChange}
        placeholder="Quantidade"
        id="quantity"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default ProductsForm;
