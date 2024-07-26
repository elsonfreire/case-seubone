import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const navbarStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#eeeeef",
    margin: "0px",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("auth", "false");
    alert("Você foi desconectado");
    navigate("/");
  };

  const renderLoginButton = () => {
    const auth = localStorage.getItem("auth");

    return auth === "false" ? (
      <li>
        <Link to="/login" style={{ marginRight: "15px" }}>
          Login
        </Link>
        <Link to="/register">Cadastrar-se</Link>
      </li>
    ) : (
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    );
  };

  const renderNavbar = () => {
    const auth = localStorage.getItem("auth");

    if (auth === "seller") {
      return (
        <>
          <li>
            <Link to="/create">Criar venda</Link>
          </li>
          <li>
            <Link to="/sales">Vendas</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else if (auth === "manager") {
      return (
        <>
          <li>
            <Link to="/create">Criar venda</Link>
          </li>
          <li>
            <Link to="/sales">Vendas</Link>
          </li>
          <li>
            <Link to="/requests">Solicitações</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/register">Cadastrar-se</Link>
        </li>
      );
    }
  };

  return <ul style={navbarStyle}>{renderNavbar()}</ul>;
};

const Header = () => {
  const headerStyle = {
    margin: "0px",
    padding: "10px",
    paddingLeft: "30px",
    backgroundColor: "#2596be",
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    height: "60px", // Ajuste o tamanho do logo conforme necessário
    marginRight: "20px", // Espaço entre o logo e o título
  };

  return (
    <>
      <header style={headerStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <h1 style={{ color: "white" }}>- Sistema de gerenciamento de vendas</h1>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
