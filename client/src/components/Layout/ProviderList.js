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
      style={{ border: isSelected ? "2px solid red" : "2px solid black" }}
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
    </Card>
  );
};

export default ProviderList;
