import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/order/history/', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-semibold">Order #{order.id}</h2>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_amount}</p>
          <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity} x {item.menu_item.name} (${item.price})
              </li>
            ))}
          </ul>
          <Link to={`/invoice/${order.id}`} className="text-indigo-600 underline">
            View Invoice
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;