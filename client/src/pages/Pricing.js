import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import placesData from "./places.json";
const { Option } = Select;

const Pricing = () => {
  const [flag, setFlag] = useState(0);
  const [places, setPlaces] = useState([]);
  const [startLocation, setStartLocation] = useState("");
  const [finalLocation, setFinalLocation] = useState("");

  const handleClick = () => {
    setFlag((prev) => prev + 1);
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

  useEffect(() => {
    getAllPlaces();
    //eslint-disable-next-line
  }, []);

  const handleOptionChange1 = (value) => {
    setStartLocation(value);
  };

  const handleOptionChange2 = (value) => {
    setFinalLocation(value);
  };

  const generateRandomArray = (places) => {
    const randomArray = {};

    places.forEach((place) => {
      randomArray[place.name] = place.distances;
    });

    return randomArray;
  };

  const randomArray = generateRandomArray(placesData.places);

  return (
    <Layout>
      <div className="container my-2">
        <div className="pricing-form">
          <div className="select-source">
            <p className="select-sr">Select Source</p>
            <Select
              className="select-box"
              showSearch
              placeholder="Select Source"
              optionFilterProp="children"
              onChange={handleOptionChange1}
            >
              {places &&
                places.map((place) => (
                  <Option key={`source-${place.name}`} value={place.name}>
                    {place.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="select-destination">
            <p className="select-sr">Select Destination</p>
            <Select
              className="select-box"
              showSearch
              placeholder="Select Destination"
              optionFilterProp="children"
              onChange={handleOptionChange2}
            >
              {places &&
                places.map((place) => (
                  <Option key={`destination-${place.name}`} value={place.name}>
                    {place.name}
                  </Option>
                ))}
            </Select>
          </div>
          <button
            type="submit"
            className="btn btn-success my-1"
            onClick={handleClick}
          >
            Check Price
          </button>
        </div>
        <div className="my-3 text-center">
          {flag !== 0 ? (
            <p>Price: {randomArray[startLocation][finalLocation]}</p>
          ) : (
            <p>Search Something...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
