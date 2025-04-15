import React, { useState } from 'react';
import axios from '../services/axios';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/token/', { username, password });
      const token = response.data.access;
      localStorage.setItem('jwt_token', token);
      setAuthenticated(true);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Erro desconhecido';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">Bem-vindo de volta</h2>
        <p className="text-center text-gray-500 mb-6">Entre com sua conta para continuar</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200 shadow-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
