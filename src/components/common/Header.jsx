import { Link } from "react-router-dom";

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
    backgroundColor: "#E4E4E4",
  };

  return (
    <>
      <header style={headerStyle}>
        <h1>Sistema de gerenciamento de vendas - SeuBoné</h1>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
