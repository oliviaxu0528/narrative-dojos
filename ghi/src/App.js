import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { AuthProvider, useToken } from './Authentication.js'
import './App.css';
import Nav from './Nav';
import Signup from './Signup';
import LoginForm from './LoginForm';

function GetToken() {
  useToken();
  return null;
}


function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_ND_API_HOST}/books`;
      console.log('fastapi url: ', url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, [])


  return (
    <div className="App">
    <BrowserRouter>
      <AuthProvider>
      <GetToken />
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/accounts" element={<Signup />} />
          <Route path="/token" element={<LoginForm />} />
        </Routes>
        </AuthProvider>
        </BrowserRouter>
      </div>

  );
}

export default App;
