import React, { useState } from 'react';
import api from '../api';
import { useHistory } from 'react-router-dom';

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { username, password });
      const response = await api.post('/api/login/', { username, password });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setToken(response.data.access);
      setUser(response.data.user);
      history.push('/menu');
    } catch (error) {
      console.error('Login error:', error.response?.data, error.response?.status);
      setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;