import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow">
          {orders.map(order => (
            <li key={order.id} className="mb-2">
              <div className="flex justify-between">
                <span>Order #{order.id} - ${order.total}</span>
                <Link to={`/invoice/${order.id}`} className="text-indigo-600">
                  View Invoice
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;