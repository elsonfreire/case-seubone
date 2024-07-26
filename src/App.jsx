import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import CreateSalePage from "./components/CreateSalePage";
import ListSalesPage from "./components/ListSalesPage";
import ListRequestPage from "./components/ListRequestsPage";
import LoginPage from "./components/LoginPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  const contentStyle = {
    marginLeft: "30px",
  };

  return (
    <Router>
      <Header />
      <main style={contentStyle}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            element={<PrivateRoute allowedRoles={["manager", "seller"]} />}
          >
            <Route path="/create" element={<CreateSalePage />} />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={["manager", "seller"]} />}
          >
            <Route path="/sales" element={<ListSalesPage />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["manager"]} />}>
            <Route path="/requests" element={<ListRequestPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
