import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import StudentMenu from "../../components/Layout/StudentMenu";
import { useAuth } from "../../context/auth";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import StarRating from "../../components/StarRating";

const StudentBookings = () => {
  const [auth] = useAuth();
  const [bookings, setBookings] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);

  const getBookings = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/student-bookings`,
        {
          userId: auth?.user._id,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setBookings(res.data.bookings.reverse());
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
        <span>{moment(record.date).format("DD-MM-YYYY")} &nbsp;</span>
      ),
    },
    {
      title: "Provider Name",
      dataIndex: "providerInfo",
      render: (providerInfo) => (providerInfo ? providerInfo.name : "N/A"),
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
    {
      title: "Actions",
      render: (_, record) => {
        if (record.status === "completed" && record.rating) {
          return (
            <StarRating
              value={record.rating}
              disabled
              onChange={() => alert("You have already rated this provider.")}
            />
          );
        } else if (record.status === "completed") {
          return (
            <Button
              onClick={() => handleRateProvider(record)}
              className="btn btn-primary"
            >
              Rate Provider
            </Button>
          );
        } else if (record.status === "pending") {
          return (
            <Button
              onClick={() => cancelBooking(record)}
              className="btn btn-danger"
            >
              Cancel Booking
            </Button>
          );
        } else {
          return(
            <Button>
              Chat with provider
            </Button>
          )
        }
      },
    },
  ];

  const handleRateProvider = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/rate-provider`,
        {
          bookingId: selectedBooking._id,
          rating: rating,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setShowRatingModal(false);
        getBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (booking) => {
    Modal.confirm({
      title: `Do you really want to cancel this booking?`,
      onOk: async () =>{
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/cancel-booking`,{
            bookingId:booking._id,
          },{
            headers:{
          Authorization: auth?.token,
            }
          })
          if(res.data.success){
            getBookings();
          }
          else{
            console.log("Failed to cancel booking")
          }
    
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        console.log(" operation canceled");
      },
    })
    
  };

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <StudentMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
              <h1 className="d-flex text-center justify-center">Student Bookings</h1>
              <Table columns={columns} dataSource={bookings} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Rate Provider"
        visible={showRatingModal} 
        onCancel={() => setShowRatingModal(false)} 
        footer={[
          <Button key="cancel" onClick={() => setShowRatingModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleRatingSubmit}>
            Submit Rating
          </Button>,
        ]}
      >
        <StarRating value={rating} onChange={handleRatingChange} />
      </Modal>
    </Layout>
  );
};

export default StudentBookings;
