import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import ProviderMenu from "../../components/Layout/ProviderMenu";
import rightImg from "../styles/autoWale.jpg";

const ProviderProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [capacity, setCapacity] = useState("");
  const [autonumber, setAutoNumber] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const { email, name, phone, capacity, autonumber } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAutoNumber(autonumber);
    setCapacity(capacity);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/provider-profile`,
        {
          name,
          email,
          password,
          phone,
          autonumber,
          capacity,
        }
      );

      if (data?.error) {
        toast.error(data.error);
      } else if (data?.updatedUser) {
        setAuth((prevAuth) => ({ ...prevAuth, user: data.updatedUser }));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...localStorage.getItem("auth"),
            user: data.updatedUser,
          })
        );
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-6">
            <ProviderMenu />
            <div className="p-5">
              <h1 className="mb-4 text-center">Your Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <label htmlFor="email" className="form-label">
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3 ">
                  <i className="fas fa-lock fa-lg me-3 fa-fw "></i>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                    
                  />
                  {/* <button
                    type="button"
                    className="btn btn-link input-group-text"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i> // Icon for hiding password
                    ) : (
                      <i className="fas fa-eye"></i> // Icon for showing password
                    )}
                  </button> */}
                </div>
                <div className="mb-3">
                  <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                  <label htmlFor="password" className="form-label">
                    Mobile no
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <i className="fas fa-chart-pie fa-lg me-3 fa-fw"></i>
                  <label htmlFor="capacity" className="form-label">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Capacity"
                  />
                </div>
                <div className="mb-3">
                  <i className="fas fa-car fa-lg me-3 fa-fw"></i>
                  <label htmlFor="password" className="form-label">
                    Auto number
                  </label>
                  <input
                    type="text"
                    value={autonumber}
                    onChange={(e) => setAutoNumber(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Auto Number"
                  />
                </div>
                <div className="">
                  <button type="submit" className="btn btn-success float-end">
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="contact-right">
              <img src={rightImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderProfile;
