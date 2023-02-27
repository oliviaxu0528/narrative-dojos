import React, { useState } from 'react';
import { useToken } from "./Authentication";
import { Navigate } from "react-router-dom";


function Signup(props) {
  const { token, signup } = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  console.log(props);

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setError('');
      await signup(username, password);
      console.log(token)
    } else {
      setError("The passwords do not match");
      window.alert("The passwords do not match")
    }
  };

  return (
<>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-4">
          <div class="card-body">
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-control"
                />
              </div>
            <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
              <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
            <img src="https://img.rankedboost.com/wp-content/uploads/2016/04/Zed.jpg" alt="Logo" width="150" height="100" class="img-fluid" />
            <img src="Shen.jpg" alt="Logo" width="150" height="100" class="img-fluid" />
            <img src="kennen.jpg" alt="Logo" width="150" height="100" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</>
  )
}


export default Signup;
