import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Select, Row } from "antd";
// import moment from "moment";
import ProviderList from "../components/Layout/ProviderList";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

const { Option } = Select;

const HomePage = () => {
  const [auth] = useAuth();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [providers, setProviders] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const  navigate = useNavigate();
  const onProviderSelect = (providerId) => {
    console.log("Selected Provider:", providerId);
    setSelectedProvider(providerId);
  };

  useEffect(() => {
    console.log("Authentication Token: hh", auth?.token);
    // Make API requests using auth.token if needed
  }, [auth]);

  const handleProceed = () => {
    if (!source ) {
      toast.error(
        "Please select source"
      );
    }  else if (!destination ) {
      toast.error(
        "Please select destination"
      );
    } else if (!selectedProvider ) {
      toast.error(
        "Please select provider"
      );
    } 
    else {
      navigate(`/booking/${source}/${destination}/${selectedProvider}`)
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
      console.log("Authentication Token:", auth?.token);
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
    // eslint-disable-next-line
  }, []);

  const onChangeSource = (value) => {
    setSource(value);
  };

  const onSearchSource = (value) => {
    setSource(value);
  };

  const onChangeDest = (value) => {
    setDestination(value);
  };

  const onSearchDest = (value) => {
    setDestination(value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Layout>
      <h1>HomePage</h1>
      <div className="text-center m-3 p-3 d-flex justify-content-center">
        <div>
          <div className="left h-full text label">Select Source</div>
          <div className="right h-full text value">
            <Select
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
        </div>

        <div>
          <div>Select Destination</div>
          <Select
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
      </div>

      <Row>
        {providers &&
          providers.map((provider) => (
            <ProviderList
              key={provider._id}
              provider={provider}
              onSelect={() => onProviderSelect(provider._id)}
              isSelected={selectedProvider === provider._id}
            />
          ))}
      </Row>
      <button onClick={handleProceed}>Proceed</button>
    </Layout>
  );
};

export default HomePage;
