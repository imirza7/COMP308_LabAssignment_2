import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_PROJECTS = gql`
  query GetProjects {
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
  const { data: projectsData, loading: loadingProjects, error: projectsError } = useQuery(GET_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);

  if (loadingProjects) return <p>Loading projects...</p>;
  if (projectsError) return <p>Error loading projects: {projectsError.message}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>List of Projects</h2>
      
      {projectsData.projects.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {projectsData.projects.map((project) => (
            <li key={project.id} onClick={() => setSelectedProject(project)} style={{ cursor: 'pointer', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}>
              <h4 style={{ margin: '0', color: '#007bff' }}>{project.projectName}</h4>
              <p style={{ margin: '5px 0' }}>{project.description || 'No description available.'}</p>
              <p style={{ margin: '5px 0' }}>Status: <strong>{project.status}</strong></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}

      {selectedProject && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #007bff', borderRadius: '5px', background: '#e7f3ff' }}>
          <h3 style={{ margin: '0' }}>Details for Project: {selectedProject.projectName}</h3>
          <p>Description: {selectedProject.description || 'No description available.'}</p>
          <p>Status: {selectedProject.status}</p>
          <h4>Associated Team:</h4>
          <p style={{ fontWeight: 'bold' }}>{selectedProject.team.teamName}</p>
        </div>
      )}
    </div>
  );
};

export default ListAllTeamsAndProjects;