import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import './App.css';

import Dashboard from './pages/Dashborad'
import AdminDashboard from './pages/AdminDashboard';

import ViewTeamDetails from './members/ViewTeamDetails';
import ViewAssignedProjects from './members/ViewAssignedProjects';
import UpdateProjectStatus from './members/UpdateProjectStatus';

import CreateTeam from './components/CreateTeam';
import CreateUser from './components/CreateUser';
import CreateProject from './components/CreateProject';
import AssignProjectToTeam from './components/AssignProjectToTeam';
import ListAllTeamsAndProjects from './components/ListAllTeamsAndProjects';
import ListAllMembersInTeam from './components/ListAllMembersInTeam';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-project-status" element={<UpdateProjectStatus />} />
        <Route path="/view-team-details" element={<ViewTeamDetails />} />
        <Route path="/view-assigned-projects" element={<ViewAssignedProjects />} />

        <Route path="/admin-dashboard/createTeam" element={<CreateTeam />} />
        <Route path="/admin-dashboard/createUser" element={<CreateUser />} />
        <Route path="/admin-dashboard/createProject" element={<CreateProject/>} />
        <Route path="/admin-dashboard/assignProjectToTeam" element={<AssignProjectToTeam />} />
        <Route path="/admin-dashboard/listAllTeamsAndProjects" element={<ListAllTeamsAndProjects />} />
        <Route path="/admin-dashboard/listAllMembersInTeam" element={<ListAllMembersInTeam />} />
      </Routes>
    </Router>
  );
};

export default App;