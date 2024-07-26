import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const auth = localStorage.getItem("auth");

  const isAuthorized = allowedRoles.includes(auth);

  if (!isAuthorized) {
    alert(
      "Você não tem permissão para acessar essa página. Redirecionando para página inicial."
    );
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
