import { useState } from "react";
import axios from "axios";
import UserForm from "./common/UserForm";
import { usersServices } from "../services/dataServices";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seller");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const user = {
      name,
      password,
      role,
    };
    usersServices
      .create(user)
      .catch(console.log("Ocorreu um erro ao cadastrar usuário"));
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <UserForm
        name={name}
        handleNameChange={handleNameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleRegister}
        extraField={
          <select value={role} onChange={handleChangeRole}>
            <option value="seller">Vendedor</option>
            <option value="manager">Gerente</option>
          </select>
        }
        submitText="Cadastrar"
      />
    </div>
  );
};

export default RegisterPage;
