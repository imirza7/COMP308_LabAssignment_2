import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      const { token, user } = data.login;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Normalize role to lowercase
      const normalizedRole = user.role.toLowerCase();

      // Redirect based on role
      if (normalizedRole === 'admin') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else if (normalizedRole === 'member') {
        navigate('/dashboard'); // Redirect to member dashboard
      } else {
        console.error('Unknown role:', user.role);
        alert('You do not have access to any dashboard.');
      }
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;