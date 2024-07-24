import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateSalePage from "./components/CreateSalePage";
import ListSalesPage from "./components/ListSalesPage";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to="/sale">Criar venda</Link>
      </li>
      <li>
        <Link to="/list">Vendas</Link>
      </li>
    </ul>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sale" element={<CreateSalePage />} />
        <Route path="/list" element={<ListSalesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
