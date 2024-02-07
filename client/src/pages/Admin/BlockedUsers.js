import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const BlockedUsers = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Blocked Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlockedUsers;
