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
  dataSources,
  introspection: true,
  playground: true,
});

const p = process.env.GOVAUTH_BACKEND_PORT || 8002
// Start our server if we're not in a test env.
  server
    .listen({ port: p })
    .then(({ url }) => console.log(`GovAuth API running at ${url}`));

