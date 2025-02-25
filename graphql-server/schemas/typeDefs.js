const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # User Type
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  # Team Type
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

  # Project Type
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

  # Auth Payload (for login/register responses)
  type AuthPayload {
    token: String!
    user: User!
  }

  # Query Type
  type Query {
    # User Queries
    users: [User!]!
    user(id: ID!): User

    # Team Queries
    teams: [Team!]!
    team(id: ID!): Team

    # Project Queries
    projects: [Project!]!
    project(id: ID!): Project
  }

  # Mutation Type
  type Mutation {
    # User Mutations
    register(username: String!, email: String!, password: String!, role: String): AuthPayload
    login(email: String!, password: String!): AuthPayload

    # Team Mutations
    createTeam(teamName: String!, description: String, members: [ID!], teamSlogan: String): Team!
    updateTeam(id: ID!, teamName: String, description: String, members: [ID!], status: String, teamSlogan: String): Team!
    deleteTeam(id: ID!): String!

    # Project Mutations
    createProject(projectName: String!, description: String, team: ID!, startDate: String!, endDate: String, status: String): Project!
    updateProject(id: ID!, projectName: String, description: String, team: ID, startDate: String, endDate: String, status: String): Project!
    deleteProject(id: ID!): String!
  }
`;

module.exports = typeDefs;