import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation, gql } from '@apollo/client';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($teamName: String!, $description: String, $memberIds: [ID!]!) {
    createTeam(teamName: $teamName, description: $description, memberIds: $memberIds) {
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
  const [memberIds, setMemberIds] = useState([]);
  const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTeam({ variables: { teamName, description, memberIds } });
      console.log('Team created:', data.createTeam);
      alert('Team created successfully!');
    } catch (err) {
      console.error('Error creating team:', err.message);
      alert('Failed to create team.');
    }
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
        <button type="submit">Create Team</button>
      </form>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default CreateTeam;