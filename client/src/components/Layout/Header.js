import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">NITJ Auto Booking Website</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
      
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Register
          </Link>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/student-register">Student</NavLink></li>
            <li><NavLink className="dropdown-item" to="/provider-register">Provider</NavLink></li>
           
          </ul>
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Login
          </Link>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/student-login">Student</NavLink></li>
            <li><NavLink className="dropdown-item" to="/provider-login">Provider</NavLink></li>
            <li><NavLink className="dropdown-item" to="/admin-login">Admin</NavLink></li>
            
           
          </ul>
        </li>

        <li className="nav-item">
                
                <NavLink to="/cart" className="nav-link" >
                  Cart
                </NavLink>
              
               
              </li>
     
      </ul>
     
    </div>
  </div>
</nav>

    </>
  );
};

export default Header;
