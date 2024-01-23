import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Tabs, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleMarkAllRead = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/getAllNotification`,
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
        message.success(res.data.message);

        const updatedAuth = {
          ...auth,
          user: {
            ...auth.user,
            seennotification: [
              ...auth.user?.seennotification,
              ...auth.user.notification,
            ],
            notification: [],
          },
        };
        setAuth(updatedAuth);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong 1");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/deleteAllNotification`,
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
        message.success(res.data.message);
        const updatedAuth = {
          ...auth,
          user: {
            ...auth.user,
            seennotification: [],
          },
        };
        setAuth(updatedAuth); // Update the auth state using setAuth
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h4 className="p-3">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {auth?.user?.notification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {auth?.user?.seennotification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
