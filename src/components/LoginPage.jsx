import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {};

  return (
    <form onSubmit={handleLogin}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="name">Nome: </label>
            </td>
            <td>
              <input value={name} onChange={handleNameChange} id="name" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Senha: </label>
            </td>
            <td>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                id="password"
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">Login</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

const Layout = () => {
  return (
    <>
      <h1>Login</h1>
      <Form />
    </>
  );
};

export default Layout;
