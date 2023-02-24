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
  },[])

  return (
    // <div className="App">
    // <BrowserRouter>
    //   <AuthProvider>
    //   <GetToken />
    //   <Nav />
    //     <Routes>
    //       <Route path="/" element={<MainPage />} />
    //       <Route path="/accounts" element={<Signup />} />
    //       <Route path="/token" element={<LoginForm />} />
    //     </Routes>
    //     </AuthProvider>
    //     </BrowserRouter>
    //   </div>
      <div className="my-5 container">
      <BrowserRouter>
        <AuthProvider>
        <GetToken />
        <Nav />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="books">
            {/* <Route path="" element={<BookList books={books} getBooks ={getBooks}/>}/> */}
          </Route>
          <Route path="/accounts" element={<Signup />} />
          <Route path="/token" element={<LoginForm />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </div>

  );
}

export default App;
