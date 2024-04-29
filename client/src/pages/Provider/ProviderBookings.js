import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProviderMenu from "../../components/Layout/ProviderMenu";
import { useAuth } from "../../context/auth";
import { Table, Select, message, Modal } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const ProviderBookings = () => {
  const [auth, setAuth] = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const getBookings = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/provider-bookings`,
        {
          providerId: auth?.user._id,
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

  const handleStatusChange = (bookingId, status) => {
    setSelectedBooking(bookingId);
    setNewStatus(status);
    setShowConfirmationModal(true);
  };

  const confirmStatusChange = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/update-booking-status`,
        {
          bookingId: selectedBooking,
          status: newStatus,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        message.success("Booking status updated successfully.");
        getBookings();
      } else {
        message.error("Failed to update booking status.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while updating booking status.");
    }
    setShowConfirmationModal(false);
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      render: (text,record) => (
        <span>{text.slice(-3)}</span>
      )
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
      title: "Actions",
      render: (_, record) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record._id, value)}
        >
          <Option value="pending">Pending</Option>
          <Option value="booked">Booked</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
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
              <h1 className="text-center">Provider Bookings</h1>
              <Table columns={columns} dataSource={bookings} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Confirmation"
        visible={showConfirmationModal}
        onOk={confirmStatusChange}
        onCancel={() => setShowConfirmationModal(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to change the status?</p>
      </Modal>
    </Layout>
  );
};

export default ProviderBookings;
