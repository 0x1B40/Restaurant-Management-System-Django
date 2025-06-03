import React from 'react';
import { useHistory } from 'react-router-dom';

const Cart = ({ cart, setCart, token }) => {
  const history = useHistory();

  const updateQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const placeOrder = async () => {
    if (!token) {
      alert('Please login to place an order');
      return;
    }
    const total_amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      total_amount,
      items: cart.map((item) => ({
        menu_item: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    const response = await fetch('http://localhost:8000/api/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      setCart([]);
      history.push('/orders');
    } else {
      alert('Order placement failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-1 border rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="font-bold mt-4">
            Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </p>
          <button
            onClick={placeOrder}
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