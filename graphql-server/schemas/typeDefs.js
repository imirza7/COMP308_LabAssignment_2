const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type Team {
    id: ID!
    teamName: String!
    description: String
    members: [User!]!
    createDate: String! # Consider renaming to createdAt for consistency
    status: String!
    teamSlogan: String
    createdAt: String!
    updatedAt: String!
  }

  type Project {
    id: ID!
    projectName: String!
    description: String
    team: Team!
    startDate: String!
    endDate: String
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    teams: [Team!]!
    team(id: ID!): Team
    projects: [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createTeam(teamName: String!, description: String, members: [String!], teamSlogan: String): Team!
    updateTeam(id: ID!, teamName: String, description: String, members: [String!], status: String, teamSlogan: String): Team!
    deleteTeam(id: ID!): String!
    createProject(projectName: String!, description: String, team: ID!, startDate: String!, endDate: String, status: String): Project!
    updateProject(id: ID!, projectName: String, description: String, team: ID, startDate: String, endDate: String, status: String): Project!
    deleteProject(id: ID!): String!
    assignProjectToTeam(projectId: ID!, teamId: ID!): Project! # Added mutation for assigning project to team
  }
`;

module.exports = typeDefs;