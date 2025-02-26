import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Dashboard from './pages/Dashborad';
import Login from './pages/Login';
import Register from './pages/Register';

import TeamDetails from './components/TeamDetails';
import ProjectDetails from './components/ProjectDetails';
import CreateTeam from './components/CreateTeam';
import CreateProject from './components/CreateProject';
import UserList from './components/UserList';
import UpdateProjectStatus from './components/UpdateProjectStatus';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/update-project-status/:id" element={<UpdateProjectStatus />} />
      </Routes>
    </Router>
  );
};

export default App;