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
    variables: { id: selectedTeamId }, // Ensure you're passing 'id' here
    skip: !selectedTeamId, // Skip the query if no team is selected
  });

  if (loadingTeams) return <p>Loading teams...</p>;
  if (teamsError) return <p>Error loading teams: {teamsError.message}</p>;

  return (
    <div>
      <h2>Select a Team to View Members</h2>
      <select onChange={(e) => setSelectedTeamId(e.target.value)} value={selectedTeamId}>
        <option value="" disabled>Select a Team</option>
        {teamsData.teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.teamName}
          </option>
        ))}
      </select>

      {selectedTeamId && (
        <div>
          {loadingMembers && <p>Loading members...</p>}
          {membersError && <p>Error loading members: {membersError.message}</p>}
          {teamData && teamData.team && (
            <div>
              <h3>Members of {teamData.team.teamName}</h3>
              {teamData.team.members.length > 0 ? (
                <ul>
                  {teamData.team.members.map((member) => (
                    <li key={member.id}>{member.username}</li>
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

export default ListAllMembersInTeam;