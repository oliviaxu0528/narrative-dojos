import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import Logout from './Logout';
function Nav() {

    const handleLogout = () => {
    Logout();
    console.log('You have logged out')

  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Home</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/accounts">Create an Account</NavLink>
          </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/token">Login</NavLink>
          </li>
            <li className="nav-item">

                  <Link
                      className="dropdown-item link"
                      aria-current="page"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>


          </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
