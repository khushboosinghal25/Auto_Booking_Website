import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Table } from "antd";
import axios from "axios";

import moment from "moment";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getAllBookings`
      );
      if (res.data.success) {
        setBookings(res.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line
  }, []);



  const columns = [
    {
        title: "Booking ID",
        dataIndex: "_id",
      },
 
      {
        title: "Provider Name",
        dataIndex: "providerInfo",
        render: (providerInfo) => (providerInfo ? providerInfo.name : "N/A"),
      },
      {
     title:"Student Name",
     dataIndex:"userInfo",
     render:(userInfo) => (userInfo ? userInfo.name : "N/A"),
      },
      {
        title: "Date",
        dataIndex: "date",
        render: (text, record) => (
          <span>{moment(record.date).format("DD-MM-YYYY")} &nbsp;</span>
        ),
      },
      {
        title: "Time",
        dataIndex: "time",
        render: (text, record) => (
          <span>{moment(record.time).format("HH:mm")} &nbsp;</span>
        ),
      },
      {
        title: "Source",
        dataIndex: "source",
      },
      {
        title: "Destination",
        dataIndex: "destination",
      },
      {
        title: "Amount",
        dataIndex: "price",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
  
  ];
  return (
    <Layout>
      <div className="container-fluid p-3 m-3 vh-90">
        <div className="row">
          <div className="">
            <AdminMenu />
          </div>
          <div className="  row-md-5 ">
            <h1 className="text-center m-3">All Bookings</h1>
            <Table columns={columns} dataSource={bookings} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
