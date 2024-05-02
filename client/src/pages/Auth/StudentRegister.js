import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import rightImg from '../styles/studentLogin.jpg'

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({}); 
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errorsCopy = {};

    if (!name.trim()) {
      errorsCopy.name = "Name is required";
      isValid = false;
    }
  
    if (!email.trim()) {
      errorsCopy.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsCopy.email = "Email is invalid";
      isValid = false;
    } else {
      const validDomains = ["nitj.ac.in"]; 
      const domain = email.split("@")[1];
      if (!validDomains.includes(domain)) {
        errorsCopy.email = "Use your official email id";
        isValid = false;
      }
    }
  
    if (!phone.trim()) {
      errorsCopy.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errorsCopy.phone = "Phone number must be 10 digits long";
      isValid = false;
    }

    if (!password.trim()) {
      errorsCopy.password = "Password is required";
      isValid = false;
    }
 
    if (!gender) {
      errorsCopy.gender = "Gender is required";
      isValid = false;
    }
  
    if (!answer.trim()) {
      errorsCopy.answer = "Answer is required";
      isValid = false;
    }
  
    setErrors(errorsCopy);
    return isValid;
  };
  

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/student-register`,
        { name, email, password, phone, gender, answer }
      );
      if (res.data.success) {
        alert("Please check your email for verification");
        toast.success(res.data.message);
        navigate("/student-login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  };

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword)
  }

  return (
    <Layout>
      <section className=" " >
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div>
              <div className=" text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Student Register
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="username"
                              id="username"
                              className="form-control"
                              placeholder="Your Username"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              className="form-control"
                              placeholder="Your Phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill position-relative mb-0">
                            <input
                              type={showPassword ? "text" : "password"} // Toggle input type
                              name="password"
                              id="password"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon position-absolute end-0 top-50 translate-middle-y`}
                              onClick={togglePasswordVisibility}
                              style={{ cursor: "pointer" }}
                            ></i>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex flex-row align-items-center">
                            <i className="fas fa-venus-mars fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="gender">
                                Choose Gender
                              </label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                onChange={handleGenderChange}
                              />
                           
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                onChange={handleGenderChange}
                              />

                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                          {errors.gender && <div className="text-danger">{errors.gender}</div>}
                        </div>

                        <div className="mb-4">
                          <div className="d-flex flex-row align-items-center">
                            <i className="fas fa-question-circle fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                name="answer"
                                id="answer"
                                className="form-control"
                                placeholder="What is your favourite sports"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                              />
                              {errors.answer && <div className="text-danger">{errors.answer}</div>}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex  mx-4 mb-3 mb-lg-4 justify-content-between">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                      <p className="mt-3">
                          Already have an account?{" "}
                          <Link to="/student-login">Login</Link>
                        </p>
                        </div> 
                      </form>
                    </div>
                    <div className="row-md-5 col-lg-6 row-xl-5 justify-content-center align-items-center  order-1 order-lg-2">
              <img src={rightImg} style={{borderRadius:'60px'}} className="img-fluid" alt='' />
            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentRegister;
