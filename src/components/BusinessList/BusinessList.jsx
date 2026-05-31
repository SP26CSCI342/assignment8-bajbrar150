import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business.jsx";

function BusinessList({ businesses }) {
  return (
    <div className="BusinessList">
      {businesses.map((business, index) => {
        return <Business business={business} key={index} />;
      })}
    </div>
  );
}

export default BusinessList;