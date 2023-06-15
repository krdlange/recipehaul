import axios from "axios";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import { useContext } from "react";
import { DateTime } from "luxon";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;


export default function PaymentA() {
  //create post request to store orders in the 'orders' table --> fetch & display in OrdersDash
  //create logic for counting delivery cost

  const navigate = useNavigate();
  const { orderedIngredients, setOrderedIngredients, totalPrice } =
    useContext(Context);

  console.log(orderedIngredients);

  const handleToken = async (token, addresses) => {
    const response = await axios.post("http://localhost:5002/checkout", {
      token,
      orderedIngredients,
    });

    const savePaidOrder = async () => {
      //create an array of strings from ingredients to be stored in the DB
      const ingredientsArray = [];
      orderedIngredients.forEach((ingredient) =>
        ingredientsArray.push(ingredient.name)
      );
      const ingredientsArrayString = ingredientsArray.join();
      console.log(ingredientsArray);
      console.log(ingredientsArrayString);

      const response = await fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          order_cost: totalPrice,
          delivery_cost: 0,
          payment_date: DateTime.now(),
          delivery_status: 0,
          ordered_ingredients: ingredientsArrayString,
        }),
      });
      const json = await response.json();
      console.log(json);
    };

    //take the response and check for the status property
    if (response.status === 200) {
      //redirecting the user to the 'Payment Succesful' page
      navigate("/payment-successful");
      savePaidOrder();
      console.log("Payment successful.");
    } else {
      console.log("Payment unsuccessful.");
    }
  };

  return (
    <div>
      {/*<ToastContainer />*/}
      <div className="container">
        <h1 className="text-center m-5">Payment checkout</h1>
        <h2 className="text-center m-5">Order Summary</h2>
        <ul>
          {orderedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>
        <h2>In Total: {getFormattedPrice(totalPrice)} </h2>{" "}
        {/*How do I get the order_cost from the database? Which ID do I use, if the ingredients are stored in a state, and not in the DB*/}
        <div className="form-group container">
          <StripeCheckout
            className="pay-btn m-5"
            stripeKey="pk_test_51M56f8C8rWbcbjLQhdLEyScdQrQL4wj3RFqGlXaGPlXSl2lGnKXr9BjCQR9WD1uhtZfPy7GvuW276GBZMIFhUL1500xXgunrmM"
            token={handleToken}
            amount={totalPrice * 100}
            //name={order.name}
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    </div>
  );
}
