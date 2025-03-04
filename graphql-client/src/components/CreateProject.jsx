import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation, gql, useQuery } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
    }
  }
`;

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject(
    $projectName: String!
    $description: String!
    $team: ID!
    $startDate: String!
    $endDate: String!
    $status: String!
  ) {
    createProject(
      projectName: $projectName
      description: $description
      team: $team
      startDate: $startDate
      endDate: $endDate
      status: $status
    ) {
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

const CreateProject = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { data: teamsData, loading: loadingTeams, error: teamsError } = useQuery(GET_TEAMS);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState(''); // Ensure this is a string
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure dates are formatted as strings
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      const { data } = await createProject({
        variables: { projectName, description, team, startDate: formattedStartDate, endDate: formattedEndDate, status },
      });
      console.log('Project created:', data.createProject);
      alert('Project created successfully!');
      // Optionally clear form fields
      setProjectName('');
      setDescription('');
      setTeam('');
      setStartDate('');
      setEndDate('');
      setStatus('');
    } catch (err) {
      console.error('Error creating project:', err.message);
      alert('Failed to create project: ' + err.message);
    }
  };

  if (loadingTeams) return <p>Loading teams...</p>;
  if (teamsError) return <p>Error loading teams: {teamsError.message}</p>;

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={team} onChange={(e) => setTeam(e.target.value)} required>
          <option value="" disabled>Select Team</option>
          {teamsData.teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.teamName}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="" disabled>Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Create Project</button>
      </form>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>
        Return to Admin Dashboard
      </button>
    </div>
  );
};

export default CreateProject;