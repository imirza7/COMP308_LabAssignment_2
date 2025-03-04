import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CURRENT_USER_TEAM = gql`
  query CurrentUserTeam {
    currentUserTeam {
      id
      teamName
      description
      members {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

const ViewTeamDetails = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_TEAM);

  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>Error loading team details: {error.message}</p>;

  const teams = data.currentUserTeam;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Your Teams</h2>
      {teams.length === 0 ? (
        <p>You are not a member of any teams.</p>
      ) : (
        teams.map(team => (
          <div key={team.id} style={teamStyle}>
            <h3>{team.teamName}</h3>
            <p><strong>Description:</strong> {team.description}</p>
            <p><strong>Members:</strong></p>
            <ul>
              {team.members.map(member => (
                <li key={member.id}>{member.username}</li>
              ))}
            </ul>
            <p><strong>Created At:</strong> {new Date(team.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(team.updatedAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
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

const teamStyle = {
  marginBottom: '20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

export default ViewTeamDetails;