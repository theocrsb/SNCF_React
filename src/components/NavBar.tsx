import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface RetourApp {
  retourRole: boolean;
  setRetourRole: React.Dispatch<React.SetStateAction<boolean>>;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;
  connect: boolean;
}

const NavBar = (props: RetourApp) => {
  const navigate = useNavigate();

  // Deco
  const handleClickOut = () => {
    console.log("dans le delete");
    localStorage.removeItem("tokens");
    localStorage.removeItem("role");
    props.setRetourRole(false);
    props.setConnect(false);
    setTimeout(() => {
      navigate("/home");
    }, 0);
  };

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
              <NavLink to="/home" end className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/selectid" className="nav-link">
                Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create" className="nav-link">
                Create
              </NavLink>
            </li>
            {!props.connect && (
              <li className="nav-item">
                <NavLink to="/connect" className="nav-link">
                  Sign in
                </NavLink>
              </li>
            )}

            {/* Admin si role admin (state dans App) */}
            {props.retourRole && (
              <NavLink to="/admin">
                <div className="text-center">
                  <label htmlFor="admin">
                    <input
                      type="button"
                      id="deco"
                      value="Admin"
                      className="btn btn-warning "
                    />
                  </label>
                </div>
              </NavLink>
            )}

            {/* Deco */}
            <NavLink to="/connect">
              <div className="text-center">
                {" "}
                <label htmlFor="deco">
                  <input
                    type="button"
                    id="deco"
                    value="Sign out"
                    className="btn btn-danger "
                    onClick={handleClickOut}
                  />{" "}
                </label>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
