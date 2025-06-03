import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

const Invoice = ({ token }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/api/invoice/${orderId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setOrder(response.data.order))
      .catch(error => {
        console.error('Error fetching invoice:', error);
        setError('Failed to load invoice. Please try again.');
      });
  }, [orderId, token]);

  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!order) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice for Order #{order.id}</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Total:</strong> ${order.total_amount}</p>
        <h2 className="text-xl mt-4">Items:</h2>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>{item.menu_item.name} - ${item.price} (x{item.quantity})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Invoice;