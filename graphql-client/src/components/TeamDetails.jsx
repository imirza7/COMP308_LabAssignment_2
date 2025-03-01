import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_TEAM_DETAILS = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      id
      teamName
      description
      members {
        id
        username
        email
      }
      teamSlogan
      status
    }
  }
`;

const TeamDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TEAM_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const team = data.team;

  return (
    <div>
      <h1>{team.teamName}</h1>
      <p>{team.description}</p>
      <p><strong>Slogan:</strong> {team.teamSlogan}</p>
      <p><strong>Status:</strong> {team.status}</p>
      <h2>Members</h2>
      <ul>
        {team.members.map((member) => (
          <li key={member.id}>
            {member.username} ({member.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;