import { NavLink } from 'react-router-dom';
import { useToken } from './Authentication';


function Nav() {
  const { token,logout } = useToken();

  const handleLogout = () => {
  logout();
  console.log('You have logged out')
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Narrative Dojo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/accounts">
                    Create an Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/token">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item">
                <NavLink className="nav-link active" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            )}
            <li>
              <NavLink id="newlocation" className="nav-link" aria-current="page" to="/locations/new">My Books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Write a book</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Read a book</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


export default Nav;
