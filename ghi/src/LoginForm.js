import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToken } from "./Authentication.js";


function LoginForm() {
  const navigate = useNavigate();
  const {token, login} = useToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      if (response.ok) {
        navigate("/");
        // console.log(token)
      } else {
        setError("Invalid credentials");
        window.alert("Invalid credentials")
      }
    } catch (error) {
      console.error(error);
    }

  };

    if (token) {
    return <Navigate to="/" />;
  }


  return (
<>

  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>


  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card mt-4">
          <div className="card-body">
            <h1>Log In</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange} className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id ="password" value={password} onChange={handlePasswordChange} className ="form-control"/>
              </div>
              <button type ="submit" className ="btn btn-primary">Log In</button>
            </form>
            <img src="ninja_head.png" alt="Logo" width="500" height="100" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>

</>
  )
}

export default LoginForm;
