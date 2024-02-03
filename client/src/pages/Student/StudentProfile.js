import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import StudentMenu from "../../components/Layout/StudentMenu";
import toast from "react-hot-toast";

const StudentProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { email, name, phone } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
        }
      );

      console.log("Response data:", data);

      if (data?.error) {
        toast.error(data.error);
      } else if (data?.updatedUser) {
        console.log("Updating auth state and local storage:", data.updatedUser);
        setAuth((prevAuth) => ({ ...prevAuth, user: data.updatedUser }));

        // Use setTimeout with 0ms delay to simulate asynchronous behavior
        setTimeout(() => {
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          console.log("Local storage updated successfully");
        }, 0);

        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong 1");
    }
  };

  return (
    <Layout>
      <div className="p-3 m-3 profile-container">
        <div className="row">
          <div className="col-md-3">
            <StudentMenu />
          </div>
          <div className="col-md-9 profile-box">
            <div className="form-container rs-form-container card">
              <h4 className="title">USER PROFILE</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 input-mb3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control rs-from-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3 input-mb3">
                  <input
                    type="email"
                    value={email}
                    className="form-control rs-from-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3 input-mb3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control rs-from-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3 input-mb3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control rs-from-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>

                <button type="submit" className="btn btn-primary form-button">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
