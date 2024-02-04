import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Select, Row } from "antd";
import ProviderList from "../components/Layout/ProviderList";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageComponent from "./ImageComponent.js";
import AddSe from "./AddSe.js";
import Stats from "./Stats.js";
const { Option } = Select;
const HomePage = () => {
  const [auth] = useAuth();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [providers, setProviders] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const navigate = useNavigate();
  const onProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
  };

  useEffect(() => {}, [auth]);

  const handleProceed = () => {
    if (!source) {
      toast.error("Please select source");
    } else if (!destination) {
      toast.error("Please select destination");
    } else if (!selectedProvider) {
      toast.error("Please select provider");
    } else {
      navigate(`/booking/${source}/${destination}/${selectedProvider}`);
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

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getAllProviders`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setProviders(res.data.data);
      } else {
        console.error("API request failed:", res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlaces();
    getUserData();
  }, []);

  const onChangeSource = (value) => {
    setSource(value);
  };

  const onChangeDest = (value) => {
    setDestination(value);
  };

  const onSearchSource = (value) => {
    const filteredPlaces = places.filter((place) =>
      place.name.toLowerCase().includes(value.toLowerCase())
    );
    setPlaces(filteredPlaces);
  };

  const onSearchDest = (value) => {
    const filteredPlaces = places.filter((place) =>
      place.name.toLowerCase().includes(value.toLowerCase())
    );
    setPlaces(filteredPlaces);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Layout>
        <div className="text-center d-flex justify-content-evenly search-container">
          <div className="select-source">
            <p className="select-sr">Select Source</p>
            <Select
              className="select-box"
              showSearch
              placeholder="Select Source"
              optionFilterProp="children"
              onChange={onChangeSource}
              onSearch={onSearchSource}
              filterOption={filterOption}
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
              onChange={onChangeDest}
              onSearch={onSearchDest}
              filterOption={filterOption}
            >
              {places &&
                places.map((place) => (
                  <Option key={`destination-${place.name}`} value={place.name}>
                    {place.name}
                  </Option>
                ))}
            </Select>
          </div>
          <button onClick={handleProceed} className="btn btn-success">
            Book Auto
          </button>
        </div>
        <AddSe></AddSe>
        <Row justify="center">
          {providers && providers.length > 0 ? (
            providers
              .slice(0, 7)
              .map((provider) => (
                <ProviderList
                  key={provider._id}
                  provider={provider}
                  onSelect={() => onProviderSelect(provider._id)}
                  isSelected={selectedProvider === provider._id}
                />
              ))
          ) : (
            <div>
              {providers ? (
                <h2>Loading providers. Please wait...</h2>
              ) : (
                <h2>No provider Available Currently</h2>
              )}
            </div>
          )}
        </Row>
        <Stats></Stats>
        <ImageComponent></ImageComponent>
      </Layout>
    </>
  );
};

export default HomePage;
