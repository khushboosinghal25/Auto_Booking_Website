import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import ProviderMenu from "../components/Layout/ProviderMenu";
import { Form, TimePicker, message } from "antd";
import { useAuth } from "../context/auth";
import axios from "axios";
import moment from "moment";

const ProviderSetTime = () => {
  const [auth, setAuth] = useAuth();
  const [timings, setTimings] = useState([]);

  useEffect(() => {
    if (auth?.user?.timings) {
      setTimings([
        moment(auth.user.timings[0], "HH:mm"),
        moment(auth.user.timings[1], "HH:mm"),
      ]);
    }
  }, [auth]);

  const handleFinish = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/settime`,
        {
          userId: auth?.user._id,
          timings: [values.startTime.format("HH:mm"), values.endTime.format("HH:mm")],
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      
      if (res.data.success) {
        message.success(res.data.message);

        // Update auth and local storage
        const updatedUser = {
          ...auth.user,
          timings: [values.startTime.format("HH:mm"), values.endTime.format("HH:mm")],
        };
        setAuth(prevAuth => ({ ...prevAuth, user: updatedUser }));
        localStorage.setItem("auth", JSON.stringify({ ...localStorage.getItem("auth"), user: updatedUser }));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in setting time");
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <ProviderMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h4 className="title">Availability Time Settings</h4>
              <Form
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                  startTime: timings[0],
                  endTime: timings[1],
                }}
              >
                <Form.Item label="Start Time" name="startTime" required>
                  <TimePicker
                    format="HH:mm"
                    onChange={(time) => setTimings([time, timings[1]])}
                  />
                </Form.Item>

                <Form.Item label="End Time" name="endTime" required>
                  <TimePicker
                    format="HH:mm"
                    onChange={(time) => setTimings([timings[0], time])}
                  />
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
  );
};

export default ProviderSetTime;
