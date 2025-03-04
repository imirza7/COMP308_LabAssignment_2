import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
  const navigate = useNavigate(); 
  const { data: teamsData, loading: loadingTeams, error: teamsError } = useQuery(GET_TEAMS);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
  
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();

      const { data } = await createProject({
        variables: { projectName, description, team, startDate: formattedStartDate, endDate: formattedEndDate, status },
      });
      console.log('Project created:', data.createProject);
      alert('Project created successfully!');
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
    <div style={containerStyle}>
      <h2 style={headerStyle}>Create Project</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={textareaStyle}
        />
        <select value={team} onChange={(e) => setTeam(e.target.value)} required style={selectStyle}>
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
          style={inputStyle}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={inputStyle}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required style={selectStyle}>
          <option value="" disabled>Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" style={buttonStyle}>Create Project</button>
      </form>

      <button style={returnButtonStyle} onClick={() => navigate('/admin-dashboard')}>
        Return to Admin Dashboard
      </button>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  background: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const textareaStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const selectStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  margin: '10px 0',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const returnButtonStyle = {
  padding: '10px',
  marginTop: '10px',
  background: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

export default CreateProject;