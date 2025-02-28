const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Correct path
const Team = require('../models/teamModel'); // Correct path
const Project = require('../models/projectModel'); // Correct path

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      return await User.find().select('-password'); // Exclude passwords
    },

    // Fetch a single user by ID
    user: async (_, { id }) => {
      return await User.findById(id).select('-password');
    },

    // Fetch all teams
    teams: async () => {
      return await Team.find().populate('members');
    },

    // Fetch a single team by ID
    team: async (_, { id }) => {
      return await Team.findById(id).populate('members');
    },

    // Fetch all projects
    projects: async () => {
      return await Project.find().populate('team');
    },

    // Fetch a single project by ID
    project: async (_, { id }) => {
      return await Project.findById(id).populate('team');
    },
  },

  Mutation: {
    // Register a new user
    register: async (_, { username, email, password, role }) => {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'Member', // Default role is 'Member'
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { token, user };
    },

    // Login a user
    login: async (_, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Validate the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { token, user };
    },

    // Create a new team
    createTeam: async (_, { teamName, description, members, teamSlogan }) => {
      const team = new Team({
        teamName,
        description,
        members,
        teamSlogan,
      });

      await team.save();
      return team;
    },

    // Update an existing team
    updateTeam: async (_, { id, teamName, description, members, status, teamSlogan }) => {
      const team = await Team.findByIdAndUpdate(
        id,
        { teamName, description, members, status, teamSlogan },
        { new: true }
      );

      if (!team) {
        throw new Error('Team not found');
      }

      return team;
    },

    // Delete a team
    deleteTeam: async (_, { id }) => {
      const team = await Team.findByIdAndDelete(id);
      if (!team) {
        throw new Error('Team not found');
      }

      return 'Team deleted successfully';
    },

    // Create a new project
    createProject: async (_, { projectName, description, team, startDate, endDate, status }) => {
      const project = new Project({
        projectName,
        description,
        team,
        startDate,
        endDate,
        status,
      });

      await project.save();
      return project;
    },

    // Update an existing project
    updateProject: async (_, { id, projectName, description, team, startDate, endDate, status }) => {
      const project = await Project.findByIdAndUpdate(
        id,
        { projectName, description, team, startDate, endDate, status },
        { new: true }
      );

      if (!project) {
        throw new Error('Project not found');
      }

      return project;
    },

    // Delete a project
    deleteProject: async (_, { id }) => {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        throw new Error('Project not found');
      }

      return 'Project deleted successfully';
    },
  },
};


module.exports = resolvers;