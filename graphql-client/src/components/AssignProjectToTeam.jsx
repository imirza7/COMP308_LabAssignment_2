import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
    }
  }
`;

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      projectName
      description
      status
    }
  }
`;

const ASSIGN_PROJECT_TO_TEAM = gql`
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
  const { data: teamsData, loading: loadingTeams, error: teamsError } = useQuery(GET_TEAMS);
  const { data: projectsData, loading: loadingProjects, error: projectsError } = useQuery(GET_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [assignProject] = useMutation(ASSIGN_PROJECT_TO_TEAM);

  if (loadingTeams || loadingProjects) return <p>Loading...</p>;
  if (teamsError) return <p>Error loading teams: {teamsError.message}</p>;
  if (projectsError) return <p>Error loading projects: {projectsError.message}</p>;

  const handleAssignProject = async () => {
    if (!selectedProjectId || !selectedTeamId) {
      alert('Please select both a project and a team.');
      return;
    }

    try {
      const { data } = await assignProject({
        variables: { projectId: selectedProjectId, teamId: selectedTeamId },
      });
      alert(`Project ${data.assignProjectToTeam.projectName} assigned to team ${data.assignProjectToTeam.team.teamName}`);
      setSelectedProjectId('');
      setSelectedTeamId('');
    } catch (error) {
      alert(`Failed to assign project: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Assign Project to Team</h2>

      <div>
        <h3>Select a Project</h3>
        <select onChange={(e) => setSelectedProjectId(e.target.value)} value={selectedProjectId} style={selectStyle}>
          <option value="" disabled>Select a Project</option>
          {projectsData?.projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Select a Team</h3>
        <select onChange={(e) => setSelectedTeamId(e.target.value)} value={selectedTeamId} style={selectStyle}>
          <option value="" disabled>Select a Team</option>
          {teamsData?.teams?.map((team) => (
            <option key={team.id} value={team.id}>
              {team.teamName}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssignProject} disabled={!selectedProjectId || !selectedTeamId} style={buttonStyle}>
        Assign Project
      </button>

      <button style={returnButtonStyle} onClick={() => navigate('/admin-dashboard')}>
        Return to Admin Dashboard
      </button>
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

const selectStyle = {
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

export default AssignProjectToTeam;