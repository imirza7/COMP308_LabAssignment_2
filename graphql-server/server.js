require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const configureMongoose = require('./config/mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/resolvers');

const startServer = async () => {
    await configureMongoose();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 GraphQL server ready at ${url}`);
};
// Start the server
startServer();