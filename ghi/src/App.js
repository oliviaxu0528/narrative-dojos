import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MainPage from './MainPage';
import { AuthProvider, useToken } from './Authentication.js'
import './App.css';
import Nav from './Nav';
import Signup from './Signup';
import LoginForm from './LoginForm';
import MyBooksList from './MyBooksList';
import CreatePages from './CreatePages';
import CreateCover from './CreateCover';
import BookDetail from './BookDetail';
import AuthorBookList from './AuthorBookList';




function GetToken() {
  useToken();
  return null;
}

function App(props) {
  const [covers, setCovers] = useState([])
  const selectedUsername = props.username;

  const getCovers = async () => {
    const coversUrl = `${process.env.REACT_APP_ND_API_HOST}/covers`;
    const response = await fetch(coversUrl)

    if (response.ok) {
      const data = await response.json();
      setCovers(data)
    }
  }
  useEffect(() => {
    getCovers()
  }, [])

  return (
    <div className="my-5 container">
      <BrowserRouter>
        <div>
          <AuthProvider>
            <GetToken />
            <div>
              <Nav />
            </div>
            <Routes>
              <Route index element={<MainPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/accounts/covers" element={<MyBooksList />} />
              <Route path="/createpages/:id" element={<CreatePages />} />
              <Route path="/createcover" element={<CreateCover />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/accounts/:username/covers" element={<AuthorBookList username={selectedUsername} />} />
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
