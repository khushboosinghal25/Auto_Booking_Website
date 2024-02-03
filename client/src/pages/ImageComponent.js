import React from "react";
import ImageComponentCard from "./ImageComponentCard.js";
function ImageComponent() {
  const CartList = [
    {
      img_link:
        "	https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/ride-budget.svg",
      card_title: "For any budget",
      card_text:
        "From Bikes and Autos to Prime Sedans and Prime SUVs, you will find a ride in your budget at your convenience any time.",
    },
    {
      img_link:
        "	https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/ride-distance.svg",
      card_title: "For any distance",
      card_text:
        "Book rides within the city with Daily, or take a trip to your favourite destinations outside the city with Outstation.",
    },
    {
      img_link:
        "	https://s3-ap-southeast-1.amazonaws.com/ola-prod-website/ride-duration.svg",
      card_title: "For any duration",
      card_text:
        "Easily plan a day out without having to worry about conveyance with an hour-based package from Rental.",
    },
  ];
  return (
    <div className="outer-co">
      <h1 class="electrified-title font-48 mar-bot-50 fw-500 black">
        There's an Auto service for NITJians
      </h1>
      <div className="container rs-card-container">
        {CartList.map((obj) => (
          <ImageComponentCard
            key={obj.card_title}
            img_link={obj.img_link}
            card_title={obj.card_title}
            card_text={obj.card_text}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageComponent;
