import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Table, message, Modal } from "antd";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [auth] = useAuth();

  const getStudents = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getAllStudents`
      );
      console.log("Response from getAllStudents:", res);
      if (res.data.success) {
        setStudents(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const blockUser = async (record, verified, status) => {
    Modal.confirm({
      title: `Do you really want to block ${record.name}?`,
      onOk: async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/block-user`,
            {
              userId: record._id,
              verified: verified,
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
            toast.success(`${record.name} is blocked`);
          }
        } catch (error) {
          console.log("Error in blocking user");
        }
      },
      onCancel() {
        console.log("Block operation canceled");
      },
    });
  };

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
          <button
            className="btn btn-danger"
            onClick={() => blockUser(record, false, "blocked")}
          >
            Block
          </button>
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
  );
};

export default Students;
