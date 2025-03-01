import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TeamList from '../components/TeamList';
import ProjectList from '../components/ProjectList';

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
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h2>Teams</h2>
      <TeamList teams={teams} />
      <h2>Projects</h2>
      <ProjectList projects={projects} />
    </div>
  );
};

export default Dashboard;