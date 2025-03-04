import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
    }
  }
`;

const GET_TEAM_PROJECTS = gql`
  query GetTeamProjects($id: ID!) {
    team(id: $id) {
      id
      teamName
      projects {
        id
        projectName
        description
        status
      }
    }
  }
`;

const ListAllTeamsAndProjects = () => {
  const { data: teamsData, loading: loadingTeams, error: teamsError } = useQuery(GET_TEAMS);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const { data: teamData, loading: loadingProjects, error: projectsError } = useQuery(GET_TEAM_PROJECTS, {
    variables: { id: selectedTeamId },
    skip: !selectedTeamId, // Skip the query if no team is selected
  });

  if (loadingTeams) return <p>Loading teams...</p>;
  if (teamsError) return <p>Error loading teams: {teamsError.message}</p>;

  return (
    <div>
      <h2>Select a Team to View Projects</h2>
      <select onChange={(e) => setSelectedTeamId(e.target.value)} value={selectedTeamId}>
        <option value="" disabled>Select a Team</option>
        {teamsData.teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.teamName}
          </option>
        ))}
      </select>

      {selectedTeamId && (
        <div>
          {loadingProjects && <p>Loading projects...</p>}
          {projectsError && <p>Error loading projects: {projectsError.message}</p>}
          {teamData && teamData.team && (
            <div>
              <h3>Projects for {teamData.team.teamName}</h3>
              {teamData.team.projects.length > 0 ? (
                <ul>
                  {teamData.team.projects.map((project) => (
                    <li key={project.id}>
                      <h4>{project.projectName}</h4>
                      <p>{project.description || 'No description available.'}</p>
                      <p>Status: {project.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No projects found for this team.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListAllTeamsAndProjects;