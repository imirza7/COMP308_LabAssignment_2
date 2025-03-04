import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation, gql } from '@apollo/client';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($teamName: String!, $description: String, $members: [ID!]) {
    createTeam(teamName: $teamName, description: $description, members: $members) {
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
  const navigate = useNavigate(); // Initialize useNavigate
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [memberIds, setMemberIds] = useState(['']); // Initialize with an empty string to allow for input

  const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTeam({ variables: { teamName, description, members: memberIds.filter(id => id) } });
      console.log('Team created:', data.createTeam);
      alert('Team created successfully!');
      // Optionally clear form fields
      setTeamName('');
      setDescription('');
      setMemberIds(['']); // Reset member IDs
    } catch (err) {
      console.error('Error creating team:', err.message);
      alert('Failed to create team: ' + err.message);
    }
  };

  const handleAddMember = () => {
    setMemberIds([...memberIds, '']); // Add an empty string for a new input
  };

  const handleMemberChange = (index, value) => {
    const updatedMemberIds = [...memberIds];
    updatedMemberIds[index] = value; // Update the specific member ID
    setMemberIds(updatedMemberIds);
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
        
        <h3>Members</h3>
        {memberIds.map((id, index) => (
          <input
            key={index}
            type="text"
            placeholder="Member ID"
            value={id}
            onChange={(e) => handleMemberChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleAddMember}>Add Member</button>

        <button type="submit">Create Team</button>
      </form>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default CreateTeam;