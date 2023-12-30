import React from "react";
import { NavLink } from "react-router-dom";

const ProviderMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Provider Panel</h4>

          <NavLink
            to="/dashboard/provider/bookings"
            className="list-group-item list-group-item-action"
          >
            Bookings
          </NavLink>
          <NavLink
            to="/dashboard/provider/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ProviderMenu;
