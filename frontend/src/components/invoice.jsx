import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Invoice = ({ token }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${orderId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setOrder(response.data))
      .catch(error => console.error('Error fetching order:', error));
  }, [orderId, token]);

  if (!order) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice for Order #{order.id}</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Total:</strong> ${order.total}</p>
        <h2 className="text-xl mt-4">Items:</h2>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Invoice;