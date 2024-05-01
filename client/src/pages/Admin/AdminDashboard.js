import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row justify-content-center">
        <AdminMenu />
          <div className="col-md-6">
            
            <div className="d-flex justify-content-center">
              <div className="card w-100 p-3 mt-5">
                <div className="card-body">
                  <h3 className="card-title">Admin Name: {auth?.user?.name}</h3>
                  <h3 className="card-title">Admin Email: {auth?.user?.email}</h3>
                  <h3 className="card-title">Admin Contact: {auth?.user?.phone}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
