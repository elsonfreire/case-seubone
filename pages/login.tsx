import { useState } from "react";
import Layout from "../components/Layout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <h1>Página de Login de Usuário</h1>
      <form>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </Layout>
  );
}
