import { useState } from "react";
import Form from "./common/UserForm";
import { usersServices } from "../services/dataServices";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    usersServices
      .getAll()
      .then((response) => {
        const foundUser = response.find((user) => {
          return user.name === name && user.password === password;
        });

        if (!foundUser) {
          alert("Credenciais incorretas");
          return;
        }

        localStorage.setItem("auth", foundUser.role);

        alert("Login realizado com sucesso");

        navigate("/create");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        name={name}
        handleNameChange={handleNameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleLogin}
        submitText="Login"
      />
    </div>
  );
};

export default LoginPage;
