import React from "react";
import { useParams, Link } from "react-router-dom";

import currencyFormatter from "../util/currencyFormatter";

export default function CarDetails({ cars, addToCart, addToBookmark }) {
  const { carId } = useParams();
  const CarDetails = cars.length
    ? cars.find((car) => car._id === parseInt(carId))
    : {
        date_added: "",
        location: { lat: "", long: "" },
        make: "",
        model: "",
        price: "",
        warehouse: "",
        year_model: "",
        _id: carId,
        licensed: false,
      };

  return (
    <div className="car-details_container">
      <div className="car-photo">Car Photo Goes Here!</div>
      <div className="car-details">
        <div className="car-maker">{CarDetails.make}</div>
        <div className="car-model">{CarDetails.model}</div>
        <div className="car-model-year">
          <span className="label">Model Year:</span>
          <b>{CarDetails.year_model}</b>
        </div>
        <div className="price">
          <span className="label">Price:</span>
          <b>{currencyFormatter.format(CarDetails.price)}</b>
        </div>
        <div className="warehouse">
          <span className="label">Location:</span> <b>{CarDetails.warehouse}</b>
        </div>
        <div className="date-added">
          <span className="label">Date Added:</span>
          <b>{CarDetails.date_added}</b>
        </div>
        <div className="action-buttons">
          <button onClick={() => addToBookmark(CarDetails._id)}>
            Add To Bookmark
          </button>
          <button
            disabled={!CarDetails.licensed}
            onClick={() => addToCart(CarDetails._id)}
          >
            Add To Cart
          </button>
          <Link to="/cart">
            <button>Go To Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
