import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Cart = ({ cart, setCart, token }) => {
  const history = useHistory();

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleOrder = async () => {
    try {
      await axios.post(
        '/api/orders/',
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart([]);
      history.push('/orders');
    } catch (error) {
      alert('Order failed');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="bg-white p-4 rounded shadow">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{item.name} - ${item.price}</span>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xl">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleOrder}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;