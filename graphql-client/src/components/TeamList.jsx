import React from 'react';
import { Link } from 'react-router-dom';

const TeamList = ({ teams }) => {
  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <Link to={`/team/${team.id}`}>{team.teamName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;