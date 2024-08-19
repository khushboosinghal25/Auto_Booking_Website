import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminProfile = () => {
  const [auth, setAuth]  = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() =>{
    const {email,name,phone} = auth?.user
    setName(name)
    setPhone(phone)
    setEmail(email)

},[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated profile data to API
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
      });

      // Handle response
      if (data?.error) {
        toast.error(data.error);
      } else if (data?.updatedUser) {
        console.log("Updating auth state and local storage:", data.updatedUser);

        setAuth((prevAuth) => ({ ...prevAuth, user: data.updatedUser }));
        setTimeout(() => {
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem('auth', JSON.stringify(ls));
          console.log("Local storage updated successfully");
        }, 0);

        toast.success('Profile Updated Successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <section className="vh-60">
      <div className="row-md-3 mt-2">
              <AdminMenu />
            </div>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title mb-4 px-4">Admin Profile</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <i className="fa-solid fa-person fa-lg me-3 fa-fw"></i>                  

                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>

                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>

                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                      />
                    </div>
                    <div className="mb-3">
                    <i className="fas fa-phone fa-lg me-3 fa-fw"></i>

                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Your Phone"
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
            
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminProfile;
