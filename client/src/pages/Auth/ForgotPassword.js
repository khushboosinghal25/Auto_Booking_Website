import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import rightImg from '../styles/forgotPassword.jpeg'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [answer,setAnswer] = useState("");

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
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
      <section className="vh-50">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <h1 className=" mb-5 mt-5 px-4">Reset account password</h1>
                    </div>
                    <div className="mb-3 input-mb3">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <label htmlFor="email" className="form-label">
                        Your email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="mb-3 input-mb3">
                      <i className="fas fa-question-circle fa-lg me-3 fa-fw"></i>
                      <label htmlFor="favourite sports" className="form-label">
                        Favourite Sports
                      </label>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="form-control"
                        id="exampleInputAnswer1"
                        placeholder="Enter Your favourite Sport Name"
                        required
                      />
                    </div>
                    <div className="mb-3 input-mb3">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputAnswer1"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-success float-end" type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <img src={rightImg} className="img-fluid" alt='' />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
