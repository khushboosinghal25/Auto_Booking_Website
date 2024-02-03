import React from "react";
import { NavLink } from "react-router-dom";

const StudentMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 className="list-group-item list-group-item-action active">Student Panel</h4>

          <NavLink
            to="/dashboard/student/student-bookings"
            className="list-group-item list-group-item-action "
          >
            Bookings
          </NavLink>
          <NavLink
            to="/dashboard/student/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default StudentMenu;
