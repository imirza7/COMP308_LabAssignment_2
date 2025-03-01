import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_PROJECT_DETAILS = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      projectName
      description
      status
      startDate
      endDate
      team {
        id
        teamName
      }
    }
  }
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const project = data.project;

  return (
    <div>
      <h1>{project.projectName}</h1>
      <p>{project.description}</p>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</p>
      <h2>Team</h2>
      <p>{project.team.teamName}</p>
    </div>
  );
};

export default ProjectDetails;