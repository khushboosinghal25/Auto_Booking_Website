import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import { message } from "antd";
import priceData from "./places.json";
import moment from "moment";
import "./styles/BookingPageStyles.css";
import rightImg from './styles/bookingPage.jpg'

const BookingPage = () => {
  const { source, destination, providerId, date, time } = useParams();
  const [provider, setProvider] = useState([]);
  const [price, setPrice] = useState();
  const [auth] = useAuth();
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State to track booking confirmation
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/getProviderById`,
        { providerId },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setProvider(res.data.data);
      } else {
        console.error("API request failed:", res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    if (bookingInProgress || bookingConfirmed) return;

    try {
      setBookingInProgress(true);
      const { _id, name, email, phone, autoNumber, capacity, status, timings } =
        provider;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/book-auto`,
        {
          providerId: providerId,
          userId: auth?.user._id,
          providerInfo: {
            _id,
            name,
            email,
            phone,
            autoNumber,
            capacity,
            status,
            timings,
          },
          userInfo: auth?.user,
          date: moment(date, "DD-MM-YYYY").toISOString(),
          time: moment(time, "HH:mm").toISOString(),
          source: source,
          destination: destination,
          price: price,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setBookingConfirmed(true); // Set booking confirmed
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("An error occurred while booking.");
    } finally {
      setBookingInProgress(false);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getPrice = (source, destination) => {
      const sourceData = priceData.places.find(
        (place) => place.name === source
      );

      if (sourceData) {
        setPrice(sourceData.distances[destination]);
        return sourceData.distances[destination];
      } else {
        return null;
      }
    };

    getPrice(source, destination);
  }, [source, destination]);

  return (
    <Layout>
      <div className="contact-container  m-3">
        <div className="row-md-8 p-5">
          <div className="contact-left-title">
            <h4>Booking Details</h4>
            <p>Source: {source}</p>
            <p>Destination: {destination}</p>
            <p>Price: {price}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
          </div>

          {provider && (
            <div className="provider-info ">
              <h4>Provider details</h4>
              <p>Provider Name: {provider.name}</p>
              <p>Auto Number: {provider.autonumber}</p>
              <p>Email Id : {provider.email}</p>

              {provider.status !== "approved" && (
                <div>He is Not an Approved Service Provider</div>
              )}
            </div>
          )}

          <div className="float-center">
            {bookingConfirmed ? (
              <button className="btn btn-success mt-3"
                onClick={() => navigate('/dashboard/student/student-bookings')}
              >
                Check Details
              </button>
            ) : (
              <button
                className="btn btn-success mt-2 "
                onClick={handleBooking}
                disabled={bookingInProgress}
              >
                {bookingInProgress ? "Booking in Progress..." : "Book Now"}
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-right float-end">
            <img src={rightImg} style={{ borderRadius: "500px" }} alt="" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
