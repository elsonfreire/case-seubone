const Products = ({ products }) => {
  const productsListStyle = {
    border: "solid 1px",
    display: "inline-block",
    padding: "10px",
    margin: "10px",
  };

  const getProductsListItems = () => {
    return products.map((product) => (
      <li key={product.sku}>
        <strong>SKU: </strong> {product.sku} <strong>QTD: </strong>
        {product.quantity}
      </li>
    ));
  };

  return (
    <div style={productsListStyle}>
      <ul style={{ padding: "5px 10px", marginLeft: "20px" }}>
        {products.length > 0 ? (
          getProductsListItems()
        ) : (
          <p>Nenhum produto foi adicionado</p>
        )}
      </ul>
    </div>
  );
};

export default Products;
