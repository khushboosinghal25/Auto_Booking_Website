import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import rightImg from '../styles/autoWale.jpg'

const ProviderRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [autonumber, setAutoNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors,setErrors] = useState({});
  const [license, setLicense] = useState(null);
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
 
    if (!autonumber) {
      errorsCopy.autonumber = "Auto Number is required";
      isValid = false;
    }
    if(!capacity){
      errorsCopy.capacity = "Capacity is required";
      isValid = false;
    }
  
    if (!answer.trim()) {
      errorsCopy.answer = "Answer is required";
      isValid = false;
    }

    if(!license){
      errorsCopy.license = "License is required";
    }
  
    setErrors(errorsCopy);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLicense(file);
  };
  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if(isValid){
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("autonumber", autonumber);
        formData.append("capacity", capacity);
        formData.append("answer", answer);
        formData.append("license", license);
  
        const res = await axios.post(
          ` ${process.env.REACT_APP_API}/api/v1/auth/provider-register`,
          formData
        );
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/provider-login");
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong n");
      }
    }
  };

  return (
    <Layout>
      <section className="m-4 ">
        <div className="container ">
          <div className="row d-flex justify-content-center align-itmes-center ">
            <div >
              <div className=" text-black" >
                <div>
                  <div className="row">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Provider Register
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
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="number"
                              name="capacity"
                              id="capacity"
                              className="form-control"
                              placeholder="Capacity"
                              value={capacity}
                              onChange={(e) => setCapacity(e.target.value)}
                            />
                              {errors.capacity && <div className="text-danger">{errors.capacity}</div>}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="AutoNumber"
                              name="AutoNumber"
                              id="AutoNumber"
                              className="form-control"
                              placeholder="AutoNumber"
                              value={autonumber}
                              onChange={(e) => setAutoNumber(e.target.value)}
                            />
                              {errors.autonumber && <div className="text-danger">{errors.autonumber}</div>}
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

                        <div className="mb-3">
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
                        <div className="mb-3">
                          <label className="btn btn-outline-secondary col-md-12">
                            {license ? license.name : "Upload Your License"}
                            <input
                              type="file"
                              name="license"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="form-control"
                              hidden
                            />
                              {errors.license && <div className="text-danger">{errors.license}</div>}
                          </label>
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
                          <Link to="/provider-login">Login</Link>
                        </p>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center order-1 order-lg-2">
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

export default ProviderRegister;
