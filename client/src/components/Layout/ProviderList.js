import React from "react";
import { Card } from "antd";

const ProviderList = ({ provider, onSelect, isSelected }) => {
  const handleSelect = () => {
    onSelect(provider._id);
    console.log("Provider Clicked:", provider._id);
  };

  return (
    <Card
      onClick={handleSelect}
      hoverable
      style={{
        border: isSelected ? "2px solid red" : "2px solid black",
        margin: "5px",
      }}
    >
      <h3>{provider.name}</h3>
      <p>
        <b>Auto Number:</b> {provider.autonumber}
      </p>
      <p>
        <b>Email Id:</b> {provider.email}
      </p>
      <p>
        <b>Capacity:</b> {provider.capacity}
      </p>
      {provider?.timings ? (
        <p>
          <b>Timings:</b> {provider.timings[0]}-{provider.timings[1]}
        </p>
      ) : (
        <p>
          <b>Timings Not provided</b>
        </p>
      )}
    </Card>
  );
};

export default ProviderList;
