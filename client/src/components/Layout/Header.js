import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const getInitial = () => {
    return auth?.user?.name ? auth?.user.name.charAt(0).toUpperCase() : "";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg px-5 bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            NITJ Auto Booking Website
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Register
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/student-register"
                        >
                          Student
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/provider-register"
                        >
                          Provider
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Login
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to="/student-login">
                          Student
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/provider-login">
                          Provider
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/admin-login">
                          Admin
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <div style={{ cursor: "pointer" , margin: "3px 10px", position: "relative"}}>
                    {auth?.user ? (
                      <Badge
                        count={auth?.user && auth?.user?.notification?.length}
                        onClick={() => {
                          navigate("/notification");
                        }}
                        className="nav-link active"
                      >
                        <i className="fa-solid fa-bell nav-item"></i>
                      </Badge>
                    ) : (
                      <></>
                    )}
                  </div>

                  <li className="nav-item" style={{ cursor: "pointer" , margin: "0 10px", position: "relative"}} >
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={`/dashboard/${
                        auth?.user?.role === 2
                          ? "provider"
                          : auth?.user?.role === 0
                          ? "student"
                          : "admin"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item dropdown " style={{ cursor: "pointer" , margin: "0 10px", position: "relative"}} >
                    <div
                      className="circle-badge"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {getInitial()}
                    </div>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 2
                              ? "provider"
                              : auth?.user?.role === 0
                              ? "student"
                              : "admin"
                          }/profile`}
                          className="dropdown-item"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to={
                            auth?.user?.role === 1
                              ? "/admin-login"
                              : auth?.user?.role === 0
                              ? "/student-login"
                              : "/provider-login"
                          }
                          className="dropdown-item"
                          href="#"
                        >
                          Log Out
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
