import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { AuthProvider, useToken } from './Authentication.js'
import './App.css';
import Nav from './Nav';
import Signup from './Signup';
import LoginForm from './LoginForm';
import MyBooksList from './MyBooksList';

function GetToken() {
  useToken();
  return null;
}

function App(props) {
  const [books, setBooks] = useState([])

  const getBooks = async () => {
    const booksUrl = `${process.env.REACT_APP_ND_API_HOST}/books`;
    const response = await fetch(booksUrl)

    if (response.ok) {
      const data = await response.json();
      setBooks(data)
    }
  }
  useEffect(() => {
    getBooks()
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
            <Route path="books">
              {/* <Route path="" element={<BookList books={books} getBooks ={getBooks}/>}/> */}
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/account" element={<MyBooksList />} />
          </Routes>
        </AuthProvider>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
