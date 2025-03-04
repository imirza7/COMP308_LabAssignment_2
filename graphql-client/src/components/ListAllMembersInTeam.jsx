import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      teamName
    }
  }
`;

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($id: ID!) {
    team(id: $id) {
      id
      teamName
      members {
        id
        username
      }
    }
  }
`;

const ListAllMembersInTeam = () => {
  const { data: teamsData, loading: loadingTeams, error: teamsError } = useQuery(GET_TEAMS);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const { data: teamData, loading: loadingMembers, error: membersError } = useQuery(GET_TEAM_MEMBERS, {
    variables: { id: selectedTeamId },
    skip: !selectedTeamId,
  });

  if (loadingTeams) return <p style={loadingStyle}>Loading teams...</p>;
  if (teamsError) return <p style={errorStyle}>Error loading teams: {teamsError.message}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Select a Team to View Members</h2>
      <select onChange={(e) => setSelectedTeamId(e.target.value)} value={selectedTeamId} style={selectStyle}>
        <option value="" disabled>Select a Team</option>
        {teamsData.teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.teamName}
          </option>
        ))}
      </select>

      {selectedTeamId && (
        <div style={membersContainerStyle}>
          {loadingMembers && <p style={loadingStyle}>Loading members...</p>}
          {membersError && <p style={errorStyle}>Error loading members: {membersError.message}</p>}
          {teamData && teamData.team && (
            <div>
              <h3 style={teamNameStyle}>Members of {teamData.team.teamName}</h3>
              {teamData.team.members.length > 0 ? (
                <ul style={listStyle}>
                  {teamData.team.members.map((member) => (
                    <li key={member.id} style={listItemStyle}>{member.username}</li>
                  ))}
                </ul>
              ) : (
                <p>No members found in this team.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Inline styles
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

const selectStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '20px',
  fontSize: '16px',
};

const membersContainerStyle = {
  marginTop: '20px',
};

const teamNameStyle = {
  margin: '0',
  color: '#007bff',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle = {
  padding: '10px',
  margin: '5px 0',
  border: '1px solid #007bff',
  borderRadius: '5px',
  background: '#e7f3ff',
};

const loadingStyle = {
  textAlign: 'center',
  color: '#555',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
};

export default ListAllMembersInTeam;