import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Modal, Table, message } from "antd";
import { useAuth } from "../../context/auth";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [auth] = useAuth();

  const getProviders = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getAllProviders`
      );
      if (res.data.success) {
        setProviders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle account status
  const handleAccountStatus = async (record, status) => {
    Modal.confirm({
      title: `Do you really want to change status of ${record.name}?`,
      onOk: async () =>{
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/changeAccountStatus`,
            {
              providerId: record._id,
              status: status,
            },
            {
              headers: {
                Authorization: auth?.token,
              },
            }
          );
          if (res.data.success) {
            message.success(res.data.message);
          }
        } catch (error) {
          message.error("Something went worng in");
        }
      },
      onCancel() {
        console.log(" operation canceled");
      },
    })
    
  };

  useEffect(() => {
    getProviders();
  }, []);

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
      title: "Auto Number",
      dataIndex: "autonumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger"
            onClick={()=> handleAccountStatus(record,"pending")}
            >Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="row-md-3">
            <AdminMenu />
          </div>
          <div className="row-md-9">
            <h1 className="text-center m-2">Providers List</h1>
            <Table columns={columns} dataSource={providers} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Providers;
