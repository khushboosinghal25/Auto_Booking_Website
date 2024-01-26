import React from 'react'
import Layout from '../components/Layout/Layout'
import ProviderMenu from '../components/Layout/ProviderMenu'
import { Form, TimePicker, message } from 'antd'
import { useAuth } from '../context/auth'
import axios from 'axios'
import moment from "moment"

const ProviderSetTime = () => {
    const [auth,setAuth] = useAuth();

   const handleFinish = async(values) =>{
     try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/settime`,{
            userId : auth?.user._id,
            timings:[
                values.timings[0].format("HH:mm"),
                values.timings[1].format("HH:mm"),
            ]
        },{
            headers:{
                Authorization: auth?.token
            }
        })
        if(res.data.success){
            message.success(res.data.message);
            setAuth((prevAuth) => {
              const updatedUser = {
                ...prevAuth.user,
                timings: [
                  values.timings[0].format('HH:mm'),
                  values.timings[1].format('HH:mm'),
                ],
              };
              console.log('Updated Auth:', updatedUser);
              return {
                ...prevAuth,
                user: updatedUser,
              };
            });
    
            // Update timings in local storage
            setTimeout(() => {
              let ls = localStorage.getItem('auth');
              ls = JSON.parse(ls);
              ls.user = {
                ...ls.user,
                timings: [
                  values.timings[0].format('HH:mm'),
                  values.timings[1].format('HH:mm'),
                ],
              };
              localStorage.setItem('auth', JSON.stringify(ls));
              console.log('Local storage updated successfully');
            }, 0);
        }else{
            message.error(res.data.message);
        }
     } catch (error) {
        console.log(error)
        message.error("Something went wrong in setting time")
     }
   }

  return (
  
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <ProviderMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
        
          <h4 className="title">Availability Time Settings</h4>
          <Form layout="vertical" onFinish={handleFinish} initialValues={{
             timings: auth?.user?.timings
             ? [
                 moment(auth?.user.timings[0], "HH:mm"),
                 moment(auth?.user.timings[1], "HH:mm"),
               ]
             : undefined,
          }}>
               <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker  format="HH:mm"/>
               </Form.Item>
         
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
          </Form>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProviderSetTime