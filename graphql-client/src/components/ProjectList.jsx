import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.projectName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;