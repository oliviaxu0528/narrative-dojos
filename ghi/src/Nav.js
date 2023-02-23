import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">CarCar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manufacturers
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers">List of manufacturers</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/manufacturers/new">Create a manufacturer</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Vehicle Models
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/models">List of vehicle models</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/models/new/">Create a vehicle model</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Automobiles
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/automobiles/">List of automobiles</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/automobiles/new/">Create an automobile</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Service Appointments
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/appointments">List of appointments</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/new/">Create an appointment</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/appointments/history/">Service History</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Technicians
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/technicians">List of technicians</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/technicians/new/">Create a technician</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales Records
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/salesrecords">List of sales records</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/salesrecords/new/">Create a sales record</NavLink></li>
                  <li><NavLink className="dropdown-item" aria-current="page" to="/salesrecords/history/">Sales person history</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Salespeople
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/salesperson/new/">Create a salesperson</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Customer
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><NavLink className="dropdown-item" aria-current="page" to="/customer/new/">Create a customer</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
        </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav;
