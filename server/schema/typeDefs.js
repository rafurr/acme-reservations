const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Reservation {
    id: ID! # Unique id
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
  }

  type Query {
    getReservation(id: ID!): Reservation
    getReservations(
      offset: Int
      limit: Int
      sortField: String
      sortOrder: String
    ): [Reservation]
  }

  type Mutation {
    addReservation(
      name: String!
      hotelName: String!
      arrivalDate: String!
      departureDate: String!
    ): Reservation
    updateReservation(
      id: ID!
      name: String!
      hotelName: String!
      arrivalDate: String!
      departureDate: String!
    ): Reservation
    deleteReservation(id: ID!): [Reservation]
  }
`;

module.exports = typeDefs;
