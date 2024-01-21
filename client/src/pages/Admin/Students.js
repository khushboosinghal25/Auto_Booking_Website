import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Table } from 'antd'
import axios from "axios"

const Students = () => {
    const [students,setStudents] = useState([]);

  const getStudents = async() =>{
    try {
       const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/getAllStudents`)
       console.log("Response from getAllStudents:", res); 
       if(res.data.success){
        setStudents(res.data.data);
       }
    } catch (error) {
        console.log(error)
    }
  }
    

    useEffect(() =>{
        getStudents();
    },[] )
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Phone No",
          dataIndex: "phone",
         
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <button className="btn btn-danger">Block</button>
            </div>
          ),
        },
      ];
  return (
    <Layout>
 
 <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center m-2">Students List</h1>
            <Table columns={columns} dataSource={students} />
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Students