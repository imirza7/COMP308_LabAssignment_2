import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation, gql } from '@apollo/client';

const ASSIGN_PROJECT_TO_TEAM_MUTATION = gql`
  mutation AssignProjectToTeam($projectId: ID!, $teamId: ID!) {
    assignProjectToTeam(projectId: $projectId, teamId: $teamId) {
      id
      projectName
      team {
        id
        teamName
      }
    }
  }
`;

const AssignProjectToTeam = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [projectId, setProjectId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [assignProjectToTeam] = useMutation(ASSIGN_PROJECT_TO_TEAM_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await assignProjectToTeam({ variables: { projectId, teamId } });
      console.log('Project assigned:', data.assignProjectToTeam);
      alert('Project assigned successfully!');
    } catch (err) {
      console.error('Error assigning project:', err.message);
      alert('Failed to assign project.');
    }
  };

  return (
    <div>
      <h2>Assign Project to Team</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          required
        />
        <button type="submit">Assign Project</button>
      </form>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default AssignProjectToTeam;