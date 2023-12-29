import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProviderRegister = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [autonumber,setAutoNumber] = useState("")
  const [capacity,setCapacity] = useState("")
  const [answer,setAnswer] = useState("")
  const [license,setLicense] = useState(null)

  const navigate = useNavigate()
  
  const handleFileChange = (e) => {
     const file = e.target.files[0];
     setLicense(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('autonumber', autonumber);
    formData.append('capacity', capacity);
    formData.append('answer', answer);
    formData.append('license', license);


      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/provider-register`,
         formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/provider-login");
      }
      else{
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong n");
    }
  };

  return (
    <Layout>
     <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title"> PROVIDER REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={autonumber}
              onChange={(e) => setAutoNumber(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Auto Number"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Max people can sit in your auto"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your Favourite sports"
              required
            />
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
                </label>
              </div> 

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>   
   </Layout>
  )
}

export default ProviderRegister