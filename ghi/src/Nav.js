import { NavLink } from 'react-router-dom';
import { useToken } from './Authentication';
import SearchBar from './SearchBar';
import { useState } from "react"

function Nav() {
  const { logout } = useToken();
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
  logout();
  console.log('You have logged out')
  }

  const handleSearch = async (searchTerm) => {
    const bookUrl = `${process.env.REACT_APP_ND_API_HOST}/books`
    const response = await fetch(bookUrl);
    if (response.ok) {
      const books = await response.json();
      const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredBooks);
    }
  }

  return (
    <nav style={{ position: 'absolute', top: 0, left: 0, right: 0 }} className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Narrative Dojo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">Create an Account</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" onClick={handleLogout}>Logout</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" aria-current="page" to="/mybooks">My Books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Write a book</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Read a book</NavLink>
            </li>
            <li className="nav-item" style={{position: 'absolute', right: 0}}>
              <SearchBar onSearch={handleSearch}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
