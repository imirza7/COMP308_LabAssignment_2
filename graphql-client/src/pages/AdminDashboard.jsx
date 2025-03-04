import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Admin Dashboard</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="createuser" style={linkStyle}>Create User</Link>
        <Link to="createteam" style={linkStyle}>Create Team</Link>
        <Link to="createproject" style={linkStyle}>Create Project</Link>
        <Link to="assignProjectToTeam" style={linkStyle}>Assign Project to Team</Link>
        <Link to="listAllTeamsAndProjects" style={linkStyle}>List All Teams and Projects</Link>
        <Link to="listAllMembersInTeam" style={linkStyle}>List All Members in a Team</Link>
      </nav>
      <hr style={{ margin: '20px 0' }} />
      <Outlet /> {/* Renders the nested routes */}
    </div>
  );
};

// Inline style for links
const linkStyle = {
  margin: '10px 0',
  padding: '10px 15px',
  background: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'background 0.3s',
  display: 'block',
  width: '200px',
  textAlign: 'center',
};

const hoverStyle = {
  background: '#0056b3',
};

export default AdminDashboard;