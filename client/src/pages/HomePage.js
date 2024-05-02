import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Select, Row, DatePicker, TimePicker } from "antd";
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
  const [date, setDate] = useState();
  const [time, setTime] = useState();

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
    } else if (!time) {
      toast.error("Please select time");
    } else if (!date) {
      toast.error("Please select date");
    }  else if (source === destination) {
      alert("Source and destination cannot be the same");
    } else if (source !== "College Main Gate" && destination !== "College Main Gate") {
      alert("This website is for college use only");
    } else if (!selectedProvider) {
      toast.error("Please select provider");
    }else {
      navigate(
        `/booking/${source}/${destination}/${selectedProvider}/${date}/${time}`
      );
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
        `${process.env.REACT_APP_API}/api/v1/auth/getSelectedProviders`,
        {
          headers: {
            Authorization: auth?.token,
          },
          params: {
            source,
            destination,
            date,
            time,
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
  }, [source, destination, date, time]);

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
      <Layout hoverable>
        <div className="text-center d-flex justify-content-evenly search-container" >
          <div className=" select-source">
            <p className="electrified-title select-sr fw-500 hoverable">Select Source</p>
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
            <p className="electrified-title fw-500 select-sr ">Select Destination</p>
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

          <div className=" select-destination">
            <p className="electrified-title fw-500 select-sr">Select Date</p>
            <DatePicker
              className="m-0 "
              format="DD-MM-YYYY"
              onChange={(value) => setDate(value?.format("DD-MM-YYYY"))}
            />
          </div>

          <div className="select-destination">
            <p className="electrified-title fw-500 select-sr ">Select Time</p>
            <TimePicker
              format="HH:mm"
              className="m-0"
              onChange={(value) => setTime(value?.format("HH:mm"))}
            />
          </div>
          <button onClick={handleProceed} className="btn btn-success p-4 m-2  ">
            Book Now 
          </button>
        </div>
    <AddSe />

        <Row justify="center">
          {providers && providers.length > 0 ? (
            <div className="providers-container">
<h3 className="electrified-title font-48 mar-bot-50 fw-500 black"> Service Providers</h3>
              <div className="electrified-title fw-500 providers-list  ">
                {providers.slice(0, 6).map((provider) => (
                  <ProviderList
                    key={provider._id}
                    provider={provider}
                    onSelect={() => onProviderSelect(provider._id)}
                    isSelected={selectedProvider === provider._id}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="no-providers">
              {providers ? (
                <h2>No provider available for this time</h2>
              ) : (
                <h2>No providers available currently</h2>
              )}
            </div>
          )}
        </Row>

        <Stats/>
        <ImageComponent/>
      </Layout>
    </>
  );
};

export default HomePage;
