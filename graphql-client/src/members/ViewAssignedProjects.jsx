import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useQuery, gql } from '@apollo/client';

const GET_ASSIGNED_PROJECTS = gql`
  query GetAssignedProjects {
    assignedProjects {
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

const ViewAssignedProjects = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { data, loading, error } = useQuery(GET_ASSIGNED_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const assignedProjects = data.assignedProjects;

  return (
    <div>
      <h1>Assigned Projects</h1>
      {assignedProjects.length > 0 ? (
        assignedProjects.map((project) => (
          <div key={project.id}>
            <h2>{project.projectName}</h2>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
          </div>
        ))
      ) : (
        <p>No projects assigned to your team.</p>
      )}

      {/* Return Button */}
      <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
    </div>
  );
};

export default ViewAssignedProjects;