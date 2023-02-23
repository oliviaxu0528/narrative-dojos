import React, { useState } from 'react';
import { useToken } from "./Authentication";
import { Navigate } from "react-router-dom";


function Signup(props) {
  const { token, signup } = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log(props);

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password);
  };

return (
    <form onSubmit={handleSubmit}>
      <label>
        username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}


export default Signup;
