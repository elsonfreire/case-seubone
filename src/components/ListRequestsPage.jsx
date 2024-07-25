import { useState } from "react";
import SaleInfo from "./SaleInfo";

const RequestsList = () => {};

const Layout = () => {
  const [requests, setRequests] = useState([]);

  const sale = {
    id: "b32e",
    products: [
      {
        sku: "TR.BD.PA.0A",
        quantity: "300",
      },
    ],
    shipping: "200",
    delivery: "turbo",
    discount: "50.50",
  };

  return (
    <>
      <h1>Solicitações</h1>
      <SaleInfo sale={sale}></SaleInfo>
    </>
  );
};

export default Layout;
