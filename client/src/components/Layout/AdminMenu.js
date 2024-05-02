import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkStyles = {
    color: "#000", // Default color
    transition: "color 0.3s ease", // Smooth transition
    textDecoration: "none", // Remove default underline
  };

  const hoverStyles = {
    color: "#008000", // Green color on hover
    textDecoration: "underline", // Underline text on hover
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light " >
        <div className="container">
          <NavLink to="" className="navbar-brand">
            Admin Panel
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/admin/students"
                  className="nav-link"
                  activeClassName="active"
                  style={linkStyles}
                  activeStyle={hoverStyles}
                >
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/admin/providers"
                  className="nav-link"
                  activeClassName="active"
                  style={linkStyles}
                  activeStyle={hoverStyles}
                >
                  Service Providers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/admin/blocked-users"
                  className="nav-link"
                  activeClassName="active"
                  style={linkStyles}
                  activeStyle={hoverStyles}
                >
                  Blocked Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin/profile"
                  className="nav-link"
                  activeClassName="active"
                  style={linkStyles}
                  activeStyle={hoverStyles}
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/admin/places"
                  className="nav-link"
                  activeClassName="active"
                  style={linkStyles}
                  activeStyle={hoverStyles}
                >
                  Places To Visit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/admin/bookings"
                  className="nav-link"
                  activeClassName="active"
                  style={linkStyles}
                  activeStyle={hoverStyles}
                >
                  All Bookings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminMenu;
