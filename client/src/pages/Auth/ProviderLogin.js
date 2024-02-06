import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate,useLocation, Link } from 'react-router-dom'
import toast from "react-hot-toast"
import { useAuth } from '../../context/auth' 

const ProviderLogin = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [auth,setAuth] = useAuth()

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {  
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/provider-login`,{
        email,
        password,
      });

      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token,
        })

        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || "/");
      }
      else{
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout>
        <main className="vh-100 bg-white">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-6 col-lg-6 col-xl-5 offset-xl-1 bg-white p-5 rounded">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-4">Provider Login</h1>
                <div className="form-group">
                  <label htmlFor="form1Example13">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="form1Example13"
                    className="form-control"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form1Example23">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="form1Example23"
                    className="form-control"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block justify-center py-64">Login</button>
                <p className="mt-3">Don't have an account? <Link to="/provider-register">Create an Account</Link></p>
                <p className="mt-3" style={{textDecoration:'none'  }}>{" "}
                  <Link to="/forgot-password">Forgot Password</Link>
                </p>
              </form>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt='' />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ProviderLogin