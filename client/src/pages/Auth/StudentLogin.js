import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/student-login`,
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <section className="bg-slate-500">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-6 col-lg-6 col-xl-5 offset-xl-1 bg-white p-5 " >
              <form onSubmit={handleSubmit}>
                <h1 className=" h1 fw-bold mb-5 mx-0 mx-md-4 mt-4">Student Login</h1>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="form1Example13"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Your Email"
                  />
                  <br/>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="form1Example23"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Your Password"
                  />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
                <br/>
                <p className="mt-3">
                  Don't have an account?{" "}
                  <Link to="/student-register">Create an Account</Link>
                </p>
                <p className="mt-3">{" "}
                  <Link to="/forgot-password">Forgot Password</Link>
                </p>
              </form>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentLogin;
