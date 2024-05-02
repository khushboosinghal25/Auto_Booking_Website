import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import PlacesForm from "../../components/Form/PlacesForm";
import toast from "react-hot-toast";
import axios from "axios";
import EditPlace from "../../components/Form/EditPlace";

const Places = () => {
  const [name, setName] = useState("");
  const [places, setPlaces] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/create-places`,
        { name }
      );

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllPlaces();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };
  const getAllPlaces = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getAllPlaces`
      );
      if (data?.success) {
        setPlaces(data?.places);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in displaying all places");
    }
  };


  const deletePlace = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/deletePlace/${id}`
      );

      if (data?.success) {
        toast.success("Place deleted successfully");
        getAllPlaces();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error while deleting ");
    }
  };

  useEffect(() => {
    getAllPlaces();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
      <div className="row-md-3">
            <AdminMenu />
          </div>
        <div className="row">
          
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-7">
                <div className="w-100"> 
                  <div className="p-3">
                    <PlacesForm
                      handleSubmit={handleSubmit}
                      value={name}
                      setValue={setName}
                    />
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {places?.map((c) => (
                        <tr key={c._id}> 
                          <td>{c.name}</td>
                          <td>
                            <EditPlace name={c.name} id={c._id} />
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => deletePlace(c._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-5">
                {/* Add your image here */}
                <img src="path_to_your_image" alt="Image" className="img-fluid" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Places; 
