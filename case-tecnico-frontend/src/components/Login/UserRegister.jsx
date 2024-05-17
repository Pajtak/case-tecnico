import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData, fetchData, deleteData, putData } from "../../services/api";
import "./UserRegister.css";

export const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchData();
      if (data) {
        setUsers(data);
      }
    };
    getUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se o email já está em uso
    const emailInUse = users.some((user) => user.email === email);
    if (emailInUse) {
      toast.error("Este email já está em uso. Por favor, use outro email.");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await postData(userData);
      console.log("Usuário criado com sucesso:", response);
      toast.success("Usuário criado com sucesso!");

      // Atualiza o estado dos usuários
      setUsers([...users, response]);

      // Limpa os campos do formulário
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Erro ao criar usuário:", error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteData(id);
    if (success) {
      setUsers(users.filter((user) => user.id !== id));
      toast.success("Usuário deletado com sucesso!");
    } else {
      console.log(id);
      toast.error("Erro ao deletar usuário.");
    }
  };

  const handleEdit = async (id) => {
    const newName = prompt("Digite o novo nome:");

    if (newName) {
      const updatedUser = { id, name: newName };
      try {
        const updatedData = await putData(id, updatedUser);
        if (updatedData) {
          setUsers(users.map((user) => (user.id === id ? updatedData : user)));
          toast.success("Usuário editado com sucesso!");
        } else {
          toast.error("Erro ao editar usuário.");
        }
      } catch (error) {
        console.error("Erro ao editar usuário:", error.message);
        toast.error("Erro ao editar usuário.");
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="right-section">
          <h2 className="logo">Crie sua conta!</h2>
          <input
            type="text"
            placeholder="Digite o seu nome de usuário"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="input-field"
          />
          <button
            className="sign-in-button"
            id="sign-in"
            onClick={handleSubmit}
          >
            Criar Conta
          </button>
        </div>
        <div className="left-section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Editar</button>
                    <button className='button_delete'onClick={() => handleDelete(user.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
