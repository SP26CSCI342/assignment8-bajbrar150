import React from "react";
import "./Business.css";

function Business({ business }) {
  return (
    <div className="Business"
      style={{
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        borderRadius: '4px'
      }}>
      <div className="image-container">
        <img src={business.imageSrc} alt={business.name} />
      </div>

      <h2>{business.name}</h2>

      <div className="Business-information">
        <div className="Business-address">
          <p>{business.address}</p>
          <p>{business.city}</p>
          <p>{business.state} {business.zipCode}</p>
        </div>

        <div className="Business-reviews">
          <h3>{business.category.toUpperCase()}</h3>
          <h3 className="rating">{business.rating} stars</h3>
          <p>{business.reviewCount} reviews</p>
        </div>
      </div>
    </div>
  );
}

export default Business;