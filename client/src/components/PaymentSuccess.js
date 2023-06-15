import React, { useState } from "react";
import { Context } from "../Context";
import { useContext } from "react";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;


export default function PaymentSuccess() {
  const { orderedIngredients, totalPrice } = useContext(Context);

  console.log(orderedIngredients);

  return (
    <div>
      <h1 className="m-5">Thank you for your order! Your payment was successful.</h1>
      <h3 className="m-5">Order Summary</h3>
      <h2 className="m-3">Total amount paid: {getFormattedPrice(totalPrice)}</h2>


      <div className="list-group">
        {/*loop through object with info about ingrediens and quantities*/}

        {orderedIngredients.map((ingredient, index) => (
          <div
            key={index}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{ingredient.name}</h5>
              <img src={ingredient.image} alt={ingredient.name} />
              {/* <small>Price: {(((ingredient.price / 100) * (ingredient.amount.metric.value)) / 100).toFixed(2)} USD</small> */}
            </div>
            <p className="mb-1">Amount: {ingredient.amount} {ingredient.unit}</p>
          <small>Price: {getFormattedPrice(ingredient.price / 100)}</small>
          </div>
        ))}


        <h5 className="m-3">We'll notify you when your order is on the way.</h5>

      </div>

    </div>
  );
}
