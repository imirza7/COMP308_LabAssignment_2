import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($projectName: String!, $description: String, $team: ID!, $startDate: String!, $endDate: String, $status: String) {
    createProject(projectName: $projectName, description: $description, team: $team, startDate: $startDate, endDate: $endDate, status: $status) {
      id
      projectName
    }
  }
`;

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createProject({
        variables: { projectName, description, team, startDate, endDate, status },
      });
      console.log('Project created:', data.createProject);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Error creating project:', err.message);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Team ID"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;