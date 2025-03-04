const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Correct path
const Team = require('../models/teamModel'); // Correct path
const Project = require('../models/projectModel'); // Correct path

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().select('-password'); // Exclude passwords
    },
    user: async (_, { id }) => {
      return await User.findById(id).select('-password');
    },
    teams: async () => {
      return await Team.find().populate('members');
    },
    team: async (_, { id }) => {
      return await Team.findById(id).populate('members');
    },
    projects: async () => {
      return await Project.find().populate('team');
    },
    project: async (_, { id }) => {
      return await Project.findById(id).populate('team');
    },
  },

  Mutation: {
    register: async (_, { username, email, password, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'Member', // Default role is 'Member'
      });

      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { token, user };
    },

    createTeam: async (_, { teamName, description, members, teamSlogan }) => {
      // Convert usernames to user IDs
      const userIds = await Promise.all(
        members.map(async (username) => {
          const user = await User.findOne({ username }); // Query by username
          return user ? user._id : null; // Return user ID or null if not found
        })
      );

      // Filter out null values (invalid usernames)
      const validUserIds = userIds.filter(id => id);

      const team = new Team({
        teamName,
        description,
        members: validUserIds, // Save valid user IDs
        teamSlogan,
      });

      await team.save();
      return team; // Ensure this is returning the correct format
    },

    updateTeam: async (_, { id, teamName, description, members, status, teamSlogan }) => {
      const userIds = await Promise.all(
        members.map(async (username) => {
          const user = await User.findOne({ username }); // Query by username
          return user ? user._id : null; // Return user ID or null if not found
        })
      );

      const validUserIds = userIds.filter(id => id);

      const team = await Team.findByIdAndUpdate(
        id,
        { teamName, description, members: validUserIds, status, teamSlogan },
        { new: true }
      );

      if (!team) {
        throw new Error('Team not found');
      }

      return team;
    },

    deleteTeam: async (_, { id }) => {
      const team = await Team.findByIdAndDelete(id);
      if (!team) {
        throw new Error('Team not found');
      }

      return 'Team deleted successfully';
    },

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

    deleteProject: async (_, { id }) => {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        throw new Error('Project not found');
      }

      return 'Project deleted successfully';
    },

    assignProjectToTeam: async (_, { projectId, teamId }) => {
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }

      const team = await Team.findById(teamId);
      if (!team) {
        throw new Error('Team not found');
      }

      project.team = teamId; // Assuming this assigns the team to the project
      await project.save();

      return project; // Return the updated project
    },
  },
};

module.exports = resolvers;