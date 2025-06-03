import React, { useState, useEffect } from 'react';
import api from '../api';

const Menu = ({ cart, setCart, token }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Menu component mounted, token:', token);
    api.get('/api/menu/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log('Menu API response:', response.data);
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu:', error.response?.data, error.response?.status);
        setError('Failed to load menu. Please try again.');
      });
  }, [token]);

  console.log('Rendering Menu, menuItems:', menuItems);

  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      {menuItems.length === 0 && !error ? (
        <div>Loading menu...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover mb-2" />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-indigo-600 font-bold">${item.price}</p>
              <button
                onClick={() => setCart([...cart, item])}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;