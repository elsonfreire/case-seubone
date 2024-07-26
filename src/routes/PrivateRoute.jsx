import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const auth = localStorage.getItem("auth");

  const isAuthorized = allowedRoles.includes(auth);

  if (!isAuthorized) {
    alert(
      "Você não pode acessar essa página. Redirecionando para página de Login."
    );
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
