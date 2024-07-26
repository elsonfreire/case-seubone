const UserForm = ({
  name,
  handleNameChange,
  password,
  handlePasswordChange,
  handleSubmit,
  extraField,
  submitText,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
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
          </tbody>
        </table>
        <div>{extraField}</div>
        <button type="submit">{submitText}</button>
      </form>
    </>
  );
};

export default UserForm;
