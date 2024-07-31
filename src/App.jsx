import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CreateSalePage from "./components/CreateSalePage";
import ListSalesPage from "./components/ListSalesPage";
import ListRequestPage from "./components/ListRequestsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import { useState } from "react";

const App = () => {
  const contentStyle = {
    marginLeft: "30px",
  };

  const [auth, setAuth] = useState("false");

  return (
    <Router>
      <Header />
      <main style={contentStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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

          <Route element={<PrivateRoute allowedRoles={[null, "false"]} />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[null, "false"]} />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
