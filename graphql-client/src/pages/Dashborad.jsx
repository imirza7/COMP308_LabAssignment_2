import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom'; // Import Link for navigation
import TeamList from '../members/ViewTeamDetails';
import UpdateProjectStatus from '../members/UpdateProjectStatus';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { teams, projects } = data;

  return (
    <div>
      <h1>Member Dashboard</h1>

      {/* Navigation Links */}
      <nav>
        <Link to="/view-team-details">View Team Details</Link> |{' '}
        <Link to="/view-assigned-projects">View Assigned Projects</Link> |{' '}
        <Link to="/update-project-status">Update Project Status</Link>
      </nav>

      {/* Team List */}
      <h2>Teams</h2>
      <TeamList teams={teams} />

      {/* Projects List */}
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.projectName}</h3>
          <p>Status: {project.status}</p>
          <UpdateProjectStatus projectId={project.id} currentStatus={project.status} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;