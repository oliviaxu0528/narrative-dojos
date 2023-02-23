import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SignUpForm from './Signup';
import { AuthProvider, useToken } from './Authentication.js'
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import Nav from './Nav';

function GetToken() {
  useToken();
  return null;
}


function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_ND_API_HOST}/api/launch-details`;
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
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/accounts" element={<SignUpForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
