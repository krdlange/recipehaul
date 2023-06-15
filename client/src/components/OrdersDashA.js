import React, { useEffect, useState } from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { DateTime } from "luxon";

export default function OrderDashA() {
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    getOrders();
    getDeliveredOrders();
  }, []);

  const getOrders = () => {
    fetch("/orders")
      .then((res) => res.json())
      .then((json) => {
        setOrders(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDeliveredOrders = () => {
    fetch("/orders/delivered")
      .then((res) => res.json())
      .then((json) => {
        setDeliveredOrders(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const orderDelivered = async (id) => {
    let confirmed = window.confirm(
      "Are you sure you want to set this order to delivered?"
    );

    if (confirmed) {
      const response = await fetch(`/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_status: 1,
        }),
      });
      const json = await response.json();
      console.log(json);
      //setOrders(json);
      getDeliveredOrders();
      getOrders();
    }
  };

  return (
    <div>
      <h1 className="ml-2">Orders to be Delivered</h1>
      <table className="table table-hover table-secondary">
        <thead>
          <tr>
            {/* <th scope="col">Delete</th> */}
            <th scope="col">Order ID</th>
            <th scope="col">Client Email</th>
            <th scope="col">Client Name</th>
            <th scope="col">Client Address</th>
            <th scope="col">Ordered Ingredients</th>
            <th scope="col">Price in Total</th>
            <th scope="col">Payment Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.email}</td>
              <td>{order.firstname} {order.lastname}</td>
              <td>{order.address}, {order.city}, {order.zipcode}</td>
              <td>{order.ordered_ingredients}</td>
              <td>{order.order_cost} USD</td>
              <td>
                {DateTime.fromISO(order.payment_date).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => orderDelivered(order.id)}
                >
                  Deliver Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="ml-2">Delivered Orders</h1>
      <table className="table table-hover table-secondary">
        <thead>
          <tr>
            {/* <th scope="col">Delete</th> */}
            <th scope="col">Order ID</th>
            <th scope="col">Client Email</th>
            <th scope="col">Client Name</th>
            <th scope="col">Client Address</th>
            <th scope="col">Ordered Ingredients</th>
            <th scope="col">Price in Total</th>
            <th scope="col">Payment Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {deliveredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.email}</td>
              <td>{order.firstname} {order.lastname}</td>
              <td>{order.address}, {order.city}, {order.zipcode}</td>
              <td>{order.ordered_ingredients}</td>
              <td>{order.order_cost} USD</td>
              <td>
                {DateTime.fromISO(order.payment_date).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </td>
              <td>Delivered</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
