import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateSalePage from "./components/CreateSalePage";
import ListSalesPage from "./components/ListSalesPage";
import ListRequestPage from "./components/ListRequestsPage";
import "./index.css";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to="/create">Criar venda</Link>
      </li>
      <li>
        <Link to="/sales">Vendas</Link>
      </li>
      <li>
        <Link to="/requests">Solicitações</Link>
      </li>
    </ul>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create" element={<CreateSalePage />} />
        <Route path="/sales" element={<ListSalesPage />} />
        <Route path="/requests" element={<ListRequestPage />} />
      </Routes>
    </Router>
  );
};

export default App;
