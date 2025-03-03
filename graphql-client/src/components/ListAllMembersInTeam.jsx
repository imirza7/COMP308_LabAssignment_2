import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useQuery, gql } from '@apollo/client';

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($id: ID!) {
    team(id: $id) {
      id
      teamName
      members {
        id
        username
        email
      }
    }
  }
`;

const ListAllMembersInTeam = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TEAM_MEMBERS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const team = data.team;

  return (
    <div>
      <h2>Members of {team.teamName}</h2>
      <ul>
        {team.members.map((member) => (
          <li key={member.id}>
            {member.username} ({member.email})
          </li>
        ))}
      </ul>

      {/* Return Button */}
      <button className="return-button" onClick={() => navigate('/admin-dashboard')}>Return to Admin Dashboard</button>
    </div>
  );
};

export default ListAllMembersInTeam;