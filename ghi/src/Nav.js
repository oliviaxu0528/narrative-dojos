import { NavLink } from 'react-router-dom';
import { useToken } from './Authentication';

function Nav() {
  const { token,logout } = useToken();

  const handleLogout = () => {
  logout();
  console.log('You have logged out')
  }

  return (
    <nav style={{ position: 'absolute', top: 0, left: 0, right: 0 }} className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <img src="https://www.clipartmax.com/png/middle/322-3224953_large-dojo-icon-dojo-agile.png" alt="logo" width="30" height="30" />
        <a className="navbar-brand" href="/">Narrative Dojo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Create an Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <>
            <li className="nav-item">
            <button
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px"
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
          </li>
            <li>
              <NavLink id="account" className="nav-link" aria-current="page" to="/account">My Books</NavLink>
            </li>
            <li>
              <NavLink id="account" className="nav-link" aria-current="page" to="/create">Create</NavLink>
            </li>
            </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
