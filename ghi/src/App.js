import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
// import BookList from './MainPage';
import MainPage from './MainPage';
import Nav from './Nav';

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
      <BrowserRouter>
      <Nav />
      <div className="my-5 container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="books">
            {/* <Route path="" element={<BookList books={books} getBooks ={getBooks}/>}/> */}
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
