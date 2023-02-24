import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import BookList from './BookList';


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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="books">
            <Route path="" element={<BookList books={books} getBooks ={getBooks}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
