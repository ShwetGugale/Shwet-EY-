import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { projectId } = useParams();

    const handleLogin = async () => {
      try {
        const response = await api.post('/auth/login', { email, password });
        const token = response.data.token;
        
        if (token) {
          localStorage.setItem('token', token);
          toast.success('Logged in successfully');
          navigate(projectId ? `/dashboard/${projectId}` : '/dashboard');
        } else {
          throw new Error('Invalid token received');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(
          error.response?.data?.message || 'Login failed. Please try again.'
        );
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-300">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
