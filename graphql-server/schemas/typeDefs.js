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
    createDate: String!
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
    createTeam(teamName: String!, description: String, members: [ID!], teamSlogan: String): Team!
    updateTeam(id: ID!, teamName: String, description: String, members: [ID!], status: String, teamSlogan: String): Team!
    deleteTeam(id: ID!): String!
    createProject(projectName: String!, description: String, team: ID!, startDate: String!, endDate: String, status: String): Project!
    updateProject(id: ID!, projectName: String, description: String, team: ID, startDate: String, endDate: String, status: String): Project!
    deleteProject(id: ID!): String!
  }
`;

module.exports = typeDefs;