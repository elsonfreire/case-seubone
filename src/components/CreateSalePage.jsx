import { useEffect, useState } from "react";
import SaleDetailsForm from "./SalesDetailsForm";
import Products from "./Products";
import ProductsForm from "./ProductsForm";

const CreateSalePage = () => {
  const [products, setProducts] = useState([]);

  return (
    <>
      <h1>Criar venda</h1>
      <h3>Produtos:</h3>
      <ProductsForm products={products} setProducts={setProducts} />
      <Products products={products} />
      <h3>Detalhes:</h3>
      <SaleDetailsForm products={products} setProducts={setProducts} />
    </>
  );
};

export default CreateSalePage;
