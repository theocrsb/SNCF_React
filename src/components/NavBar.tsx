import axios from "axios";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  // recuperer le token decoder pour afficher ou non des elements
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-light shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          🪴 Société Nature Cueillette et Fleur
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <a className='nav-link active' aria-current='page' href='#'>
                Home
              </a> */}
              <NavLink to="/home" end className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className='nav-link' href='#'>
                Details
              </a> */}
              <NavLink to="/selectid" className="nav-link">
                Details
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className='nav-link' href='#'>
                Details
              </a> */}
              <NavLink to="/create" className="nav-link">
                Create
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className='nav-link' href='#'>
                Details
              </a> */}
              <NavLink to="/connect" className="nav-link">
                Sign in
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign in
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
