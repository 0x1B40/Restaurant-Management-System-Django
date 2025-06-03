import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/api/admin/orders/', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [token]);

  const updateStatus = async (orderId, status) => {
    await fetch(`http://localhost:8000/api/admin/orders/${orderId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-semibold">Order #{order.id} by {order.user.username}</h2>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_amount}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity} x {item.menu_item.name} (${item.price})
              </li>
            ))}
          </ul>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
            className="mt-2 p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;