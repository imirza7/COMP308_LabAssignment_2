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
      const { data } = await createUser({ variables: { username, email, password, role: role === 'member' ? null : role } });
      const user = data.register.user;
      console.log('User created:', user);
      alert('User created successfully!');
    } catch (err) {
      console.error('Error creating user:', err.message);
      alert('Failed to create user: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default CreateUser;