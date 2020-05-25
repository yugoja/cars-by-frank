import React from "react";

import currencyFormatter from "../util/currencyFormatter";

export default function Cart({ cart, cars }) {
  let cartTotal = 0;

  return (
    <div className="cart_container">
      <h2>Cart</h2>
      <ul>
        <li>
          <span className="cart-item">Car Name</span>
          <span className="cart-item">Price</span>
          <span className="cart-item">Quantity</span>
          <span className="cart-item">Total Price</span>
        </li>
        {cart.map((cartItem, index) => {
          const cartItemDetails = cars.length
            ? cars.find((car) => car._id === parseInt(cartItem.carId))
            : {
                make: "",
                model: "",
                price: "",
              };

          cartTotal =
            cartTotal + parseFloat(cartItemDetails.price) * cartItem.quantity;

          return (
            <li key={index}>
              <span className="cart-item title">{cartItemDetails.model}</span>
              <span className="cart-item price">
                {currencyFormatter.format(cartItemDetails.price)}
              </span>
              <span className="cart-item quantity">{cartItem.quantity}</span>
              <span className="cart-item cart-item-totalprice">
                {currencyFormatter.format(
                  parseFloat(cartItemDetails.price) * cartItem.quantity
                )}
              </span>
            </li>
          );
        })}
        <li>
          <span className="cart-item"></span>
          <span className="cart-item"></span>
          <span className="cart-item">Total Price</span>
          <span className="cart-item">
            {currencyFormatter.format(cartTotal)}
          </span>
        </li>
      </ul>
    </div>
  );
}
