import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Select, DatePicker, TimePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const HomePage = () => {
  const [auth] = useAuth("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  

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
            options={[
              {
                value: "college Main Gate",
                label: "College Main Gate",
              },
              {
                value: "bus stand",
                label: "Bus Stand",
              },
              {
                value: "railway station",
                label: "Railway Station",
              },
            ]}
          />
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
          options={[
            {
              value: "college Main Gate",
              label: "College Main Gate",
            },
            {
              value: "bus stand",
              label: "Bus Stand",
            },
            {
              value: "railway station",
              label: "Railway Station",
            },
          ]}
        />

        
</div>
      </div>

      
      <p> {JSON.stringify(auth)}</p>
      <p>Source: {source}</p>
      <p>Destination:{destination}</p>

    </Layout>
  );
};

export default HomePage;
