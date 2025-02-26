import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Spinner } from 'react-bootstrap'; // Assuming you're using React Bootstrap for spinner

// GraphQL query to get teams and projects
const GET_TEAMS_AND_PROJECTS = gql`
  query GetTeamsAndProjects {
    teams {
      id
      teamName
      description
      members {
        id
        username
      }
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

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_TEAMS_AND_PROJECTS);

  // Show loading spinner while fetching data
  if (loading) return <div className="loading"><Spinner animation="border" /> Loading...</div>;

  // Show error message if there's an error
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="section">
        <h2>Teams</h2>
        <div className="teams-list">
          {data.teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Projects</h2>
        <div className="projects-list">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
