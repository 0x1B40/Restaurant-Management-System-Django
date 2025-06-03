import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Menu from './components/menu';
import Cart from './components/cart';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/AdminDashboard';
import Invoice from './components/Invoice';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setToken('');
    setUser(null);
    setCart([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-indigo-600 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-xl font-bold">Middle Eastern Restaurant</Link>
            <div>
              {token ? (
                <>
                  <Link to="/menu" className="mr-4">Menu</Link>
                  <Link to="/cart" className="mr-4">Cart ({cart.length})</Link>
                  <Link to="/orders" className="mr-4">Orders</Link>
                  {user?.is_staff && <Link to="/admin" className="mr-4">Admin</Link>}
                  <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mr-4">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setToken={setToken} setUser={setUser} />
          </Route>
          <Route path="/menu">
            {token ? <Menu cart={cart} setCart={setCart} token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/cart">
            {token ? <Cart cart={cart} setCart={setCart} token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/orders">
            {token ? <OrderHistory token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/admin">
            {token && user?.is_staff ? <AdminDashboard token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/invoice/:orderId">
            {token ? <Invoice token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            {token ? <Menu cart={cart} setCart={setCart} token={token} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;