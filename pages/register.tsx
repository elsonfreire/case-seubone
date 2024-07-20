import { useState } from "react";
import Layout from "../components/Layout";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("salesperson");

  return (
    <Layout>
      <h1>Página de Cadastro de Usuário</h1>
      <form>
        <input type="text" placeholder="Usuário" value={username}></input>
        <br />
        <input type="text" placeholder="Senha" value={password}></input>
        <br />
        <select value={role}>
          <option value="salesperson">Vendedor</option>
          <option value="manager">Gerente</option>
        </select>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </Layout>
  );
}
