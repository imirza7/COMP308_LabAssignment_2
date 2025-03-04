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
    console.log('Project ID:', selectedProjectId);
    console.log('Team ID:', selectedTeamId);
  
    if (!selectedProjectId || !selectedTeamId) {
      alert('Please select both a project and a team.');
      return;
    }
  
    try {
      const projectId = String(selectedProjectId);
      const teamId = String(selectedTeamId);
  
      console.log('Assigning project with variables:', { projectId, teamId });
      const { data } = await assignProject({
        variables: { projectId, teamId },
      });
      alert(`Project ${data.assignProjectToTeam.projectName} assigned to team ${data.assignProjectToTeam.team.teamName}`);
      setSelectedProjectId('');
      setSelectedTeamId('');
    } catch (error) {
      console.error('Error assigning project:', error);
      alert(`Failed to assign project: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Assign Project to Team</h2>

      <div>
        <h3>Select a Project</h3>
        <select onChange={(e) => setSelectedProjectId(e.target.value)} value={selectedProjectId}>
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
        <select onChange={(e) => setSelectedTeamId(e.target.value)} value={selectedTeamId}>
          <option value="" disabled>Select a Team</option>
          {teamsData?.teams?.map((team) => (
            <option key={team.id} value={team.id}>
              {team.teamName}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssignProject} disabled={!selectedProjectId || !selectedTeamId}>
        Assign Project
      </button>
    </div>
  );
};

export default AssignProjectToTeam;