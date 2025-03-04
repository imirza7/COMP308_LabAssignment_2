import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String) {
    register(username: $username, email: $email, password: $password, role: $role) {
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

const CreateUser = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: { username, email, password, role: role === 'member' ? null : role }
      });
      const user = data.register.user;
      console.log('User created:', user);
      alert('User created successfully!');
      navigate('/admin-dashboard'); // Navigate back to the dashboard upon success
    } catch (err) {
      console.error('Error creating user:', err.message);
      alert('Failed to create user: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Create User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <button type="submit" style={buttonStyle}>Create User</button>
      </form>

      {/* Return Button */}
      <button onClick={() => navigate('/admin-dashboard')} style={returnButtonStyle}>
        Return to Admin Dashboard
      </button>
    </div>
  );
};

// Common styles for input fields
const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

// Styles for primary button
const buttonStyle = {
  padding: '10px',
  margin: '10px 0',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

// Styles for return button
const returnButtonStyle = {
  padding: '10px',
  marginTop: '10px',
  background: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

export default CreateUser;