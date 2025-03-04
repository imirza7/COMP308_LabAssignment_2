import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="createuser">Create User</Link> |{' '}
        <Link to="createteam">Create Team</Link> |{' '}
        <Link to="createproject">Create Project</Link> | {' '}
        <Link to="assignProjectToTeam">Assign Project to Team</Link> |{' '}
        <Link to="listAllTeamsAndProjects">List All Teams and Projects</Link> |{' '}
        <Link to="listAllMembersInTeam">List All Members in a Team</Link>
      </nav>
      <hr />
      <Outlet /> {/* Renders the nested routes */}
    </div>
  );
};

export default AdminDashboard;