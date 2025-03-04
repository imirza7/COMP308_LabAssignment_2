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
    <div>
      <h2>Create Team</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          />
        ))}
        <button type="button" onClick={handleAddMember}>Add Member</button>

        <button type="submit">Create Team</button>
      </form>

      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default CreateTeam;