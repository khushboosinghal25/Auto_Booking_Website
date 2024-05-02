import React from "react";
import { NavLink } from "react-router-dom";

const ProviderMenu = () => {
  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            exact
            to="/dashboard/provider/provider-bookings"
            className="nav-link"
            activeClassName="active"
          >
            Bookings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/provider/profile"
            className="nav-link"
            activeClassName="active"
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/dashboard/provider/set-time"
            className="nav-link"
            activeClassName="active"
          >
            Set your Availability
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProviderMenu;
