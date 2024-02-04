import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";

const BookingPage = () => {
  const { source, destination, providerId } = useParams();
  const [provider, setProvider] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const [auth] = useAuth();
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

  const handleAvailability = async () => {
    try {
      if (!date && !time) {
        return alert("Date & time Required");
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/handle-availibility`,
        {
          providerId: providerId,
          date,
          time,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false)
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return alert("Date & time Required");
      }
      await handleAvailability();
      if (isAvailable) {
        const {
          _id,
          name,
          email,
          phone,
          autoNumber,
          capacity,
          status,
          timings,
        } = provider;
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
            date: date,
            time: time,
            source: source,
            destination: destination,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          // Handle unsuccessful booking
          message.error(res.data.message);
        }
      } else {
        message.error("He is unavailable at this time. Try Someone else");
      }
    } catch (error) {
      message.error("An error occurred while booking.");
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Booking Page</h1>

      <p>Source: {source}</p>
      <p>Destination: {destination}</p>
      <p>Provider ID: {providerId}</p>
      <div className="container">
        {provider !== undefined ? (
          <div>
            <h4>ProviderName:- {provider.name}</h4>

            {provider?.timings ? (
              <h4>
                Timings: {provider?.timings[0]}-{provider?.timings[1]}
              </h4>
            ) : (
              <div>He has not set his Timings</div>
            )}
            {provider?.status !== "approved" ? (
              <div>He is Not a Approved Service Provider</div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div className="d-flex flex-column w-50">
          <DatePicker
            className="m-2"
            format="DD-MM-YYYY"
            onChange={(value) => setDate(value?.format("DD-MM-YYYY"))}
          />
          <TimePicker
            format="HH:mm"
            className="m-2"
            onChange={(value) => setTime(value?.format("HH:mm"))}
          />
          <button className="btn btn-primary mt-2" onClick={handleAvailability}>
            Check Availability
          </button>
          <button className="btn btn-dark mt-2" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
