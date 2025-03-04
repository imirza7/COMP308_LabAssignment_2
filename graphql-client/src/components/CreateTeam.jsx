import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useMutation, gql } from '@apollo/client';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($teamName: String!, $description: String, $memberUsernames: [String!]) {
    createTeam(teamName: $teamName, description: $description, members: $memberUsernames) {
      id
      teamName
      description
      members {
        id
        username
      }
    }
  }
`;

const CreateTeam = () => {
  const navigate = useNavigate(); 
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [memberUsernames, setMemberUsernames] = useState(['']); 

  const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredUsernames = memberUsernames.filter(username => username.trim());

    if (filteredUsernames.length === 0) {
      alert('Please add at least one member username.');
      return;
    }

    try {
      const { data } = await createTeam({
        variables: { 
          teamName, 
          description, 
          memberUsernames: filteredUsernames 
        }
      });
      console.log('Team created:', data.createTeam);
      alert('Team created successfully!');
      setTeamName('');
      setDescription('');
      setMemberUsernames(['']); 
    } catch (err) {
      console.error('Error creating team:', err.message);
      alert('Failed to create team: ' + err.message);
    }
  };

  const handleAddMember = () => {
    setMemberUsernames([...memberUsernames, '']); 
  };

  const handleMemberChange = (index, value) => {
    const updatedMemberUsernames = [...memberUsernames];
    updatedMemberUsernames[index] = value; 
    setMemberUsernames(updatedMemberUsernames);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Create Team</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />
        
        <h3>Members (Add by Username)</h3>
        {memberUsernames.map((username, index) => (
          <input
            key={index}
            type="text"
            placeholder="Member Username"
            value={username}
            onChange={(e) => handleMemberChange(index, e.target.value)}
            required
            style={inputStyle}
          />
        ))}
        <button type="button" onClick={handleAddMember} style={buttonStyle}>Add Member</button>

        <button type="submit" style={buttonStyle}>Create Team</button>
      </form>

      <button style={returnButtonStyle} onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  background: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const textareaStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

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

export default CreateTeam;