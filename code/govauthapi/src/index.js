const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const GovCoreApi = require('./datasources/govcore');

// set up any dataSources our resolvers need
const dataSources = () => ({
  GovCoreApi: new GovCoreApi()
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

// Start our server if we're not in a test env.
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`GovAuth API running at ${url}`));

