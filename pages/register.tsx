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
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <br />
        <select
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
          }}
        >
          <option value="salesperson">Vendedor</option>
          <option value="manager">Gerente</option>
        </select>
        <br />
        <button type="submit">Criar conta</button>
      </form>
    </Layout>
  );
}
