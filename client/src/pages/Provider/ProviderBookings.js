import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import ProviderMenu from '../../components/Layout/ProviderMenu'
import { useAuth } from '../../context/auth'
import { Table } from "antd";
import axios from "axios";
import moment from "moment";

const ProviderBookings = () => {
    const [auth,setAuth] = useAuth();
    const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/provider-bookings`,
               {
                providerId:auth?.user._id,
               },
        {
          headers: {
            Authorization: auth?.token,
          },
         
        }
      );
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, [auth]);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
    },
    {
        title: "Date",
        dataIndex: "date",
        render: (text, record) => (
          <span>
            {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          </span>
        ),
      },
      {
           title:"Provider Name",
           dataIndex: "providerInfo",
           render: (providerInfo) => providerInfo ? providerInfo.name : 'N/A',
      },
      {
        title: "Time",
        dataIndex: "time",
        render: (text, record) => (
          <span>
            {moment(record.time).format("HH:mm")} &nbsp;
          </span>
        ),
      },
    {
        title:"Source",
        dataIndex:"source",
    },
    {
        title:"Destination",
        dataIndex:"destination",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return ( 
    <Layout>
       <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <ProviderMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
              <h1>Provider Bookings</h1>
              <Table columns={columns} dataSource={bookings} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProviderBookings