import { Link } from "react-router-dom";
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

  return (
    <ul style={navbarStyle}>
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
        <h1 style={{ color: "white" }}>Sistema de gerenciamento de vendas</h1>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
