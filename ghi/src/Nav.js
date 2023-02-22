import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
            <a className="navbar-brand" href="/"></a>
            <NavLink className="navbar-brand" to="/">
            Narrative Ninjas
            </NavLink>
        </div>
    </nav>
  );
}

export default Nav;
