import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToken } from "./Authentication.js";


function LoginForm() {
  const navigate = useNavigate();
  const {token, login} = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    login(username, password);
    event.preventDefault();
    navigate("/");
    console.log(token)
  };

    if (token) {
    return <Navigate to="/" />;
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
