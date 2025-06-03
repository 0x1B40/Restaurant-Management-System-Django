import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminDashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', image_url: '' });

  useEffect(() => {
    api.get('/api/admin/orders/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setOrders(response.data))
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again.');
      });
  }, [token]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/menu-items/', { ...newItem, price: parseFloat(newItem.price) }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Item added successfully');
      setNewItem({ name: '', description: '', price: '', category: '', image_url: '' });
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl mb-2">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow mb-6">
          {orders.map(order => (
            <li key={order.id} className="mb-2">Order #{order.id} - ${order.total_amount}</li>
          ))}
        </ul>
      )}
      <h2 className="text-xl mb-2">Add Menu Item</h2>
      <form onSubmit={handleAddItem} className="max-w-md bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category (Food/Drink)"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image_url}
          onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Add Item</button>
      </form>
    </div>
  );
};

export default AdminDashboard;