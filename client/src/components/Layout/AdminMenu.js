import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>

          <NavLink
            to="/dashboard/admin/students"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/providers"
            className="list-group-item list-group-item-action"
          >
            Service Providers
          </NavLink>
          <NavLink
            to="/dashboard/admin/blocked-users"
            className="list-group-item list-group-item-action"
          >
           Blocked Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/profile"
            className="list-group-item list-group-item-action"
          >
          Profile
          </NavLink>

          <NavLink
            to="/dashboard/admin/places"
            className="list-group-item list-group-item-action"
          >
          Places To Visit
          </NavLink>

          <NavLink
            to="/dashboard/admin/bookings"
            className="list-group-item list-group-item-action"
          >
          All Bookings
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
