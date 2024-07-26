import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import CreateSalePage from "./components/CreateSalePage";
import ListSalesPage from "./components/ListSalesPage";
import ListRequestPage from "./components/ListRequestsPage";
import LoginPage from "./components/LoginPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import RegisterPage from "./components/RegisterPage";

const App = () => {
  const contentStyle = {
    marginLeft: "30px",
  };

  return (
    <Router>
      <Header />
      <main style={contentStyle}>
        <Routes>
          <Route path="/" element={<CreateSalePage />} />
          <Route path="/create" element={<CreateSalePage />} />
          <Route path="/sales" element={<ListSalesPage />} />
          <Route path="/requests" element={<ListRequestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
