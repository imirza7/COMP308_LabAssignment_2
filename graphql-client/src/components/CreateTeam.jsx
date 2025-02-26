import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($teamName: String!, $description: String, $members: [ID!], $teamSlogan: String) {
    createTeam(teamName: $teamName, description: $description, members: $members, teamSlogan: $teamSlogan) {
      id
      teamName
    }
  }
`;

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [teamSlogan, setTeamSlogan] = useState('');
  const [createTeam] = useMutation(CREATE_TEAM_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTeam({ variables: { teamName, description, members, teamSlogan } });
      console.log('Team created:', data.createTeam);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Error creating team:', err.message);
    }
  };

  return (
    <div>
      <h1>Create Team</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Team Slogan"
          value={teamSlogan}
          onChange={(e) => setTeamSlogan(e.target.value)}
        />
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;