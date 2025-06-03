import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/AdminDashboard';
import Invoice from './components/Invoice';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [cart, setCart] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
            <Menu cart={cart} setCart={setCart} token={token} />
          </Route>
          <Route path="/cart">
            <Cart cart={cart} setCart={setCart} token={token} />
          </Route>
          <Route path="/orders">
            <OrderHistory token={token} />
          </Route>
          <Route path="/admin">
            <AdminDashboard token={token} />
          </Route>
          <Route path="/invoice/:orderId">
            <Invoice token={token} />
          </Route>
          <Route path="/">
            <Menu cart={cart} setCart={setCart} token={token} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;