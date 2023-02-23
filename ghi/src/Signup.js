import React, { useState } from 'react';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {username, password};

    try {
        const response = await fetch('/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("SUCESS");
        } else {
            console.error("Failed to sign up:", response.status);
        }
    } catch (error) {
        console.error('Failed to sign up', error);
    }

    console.log('Form submitted:', { username, password });
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

export default SignUpForm;
