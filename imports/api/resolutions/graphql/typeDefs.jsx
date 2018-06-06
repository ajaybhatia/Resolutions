export const typeDefs = `
  scalar Date

  type Query {
    resolutions: [Resolution!]!
  }

  type Mutation {
    createResolution(name: String!, complete: Boolean): Resolution!
    removeResolution(id: ID!): Resolution!
    toggleComplete(id: ID!): Resolution!
  }

  type Resolution {
    _id: ID!
    name: String!
    complete: Boolean!
    createdAt: Date!
  }
`;
