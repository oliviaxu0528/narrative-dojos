import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Narrative Dojo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink id="newlocation" className="nav-link" aria-current="page" to="/locations/new">My Books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink id="newconference" className="nav-link" aria-current="page" to="/conferences/new">Write a book</NavLink>
            </li>
            <li className="nav-item">
              <NavLink id="newpresentation" className="nav-link" aria-current="page" to="/presentations/new">Read a book</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
}

export default Nav;
