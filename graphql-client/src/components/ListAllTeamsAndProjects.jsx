import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useQuery, gql } from '@apollo/client';

const GET_TEAMS_AND_PROJECTS = gql`
  query GetTeamsAndProjects {
    teams {
      id
      teamName
      description
    }
    projects {
      id
      projectName
      description
      status
      team {
        id
        teamName
      }
    }
  }
`;

const ListAllTeamsAndProjects = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { data, loading, error } = useQuery(GET_TEAMS_AND_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { teams, projects } = data;

  return (
    <div>
      <h2>All Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <h3>{team.teamName}</h3>
            <p>{team.description}</p>
          </li>
        ))}
      </ul>

      <h2>All Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
          </li>
        ))}
      </ul>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default ListAllTeamsAndProjects;