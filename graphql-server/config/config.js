// const dotenv = require('dotenv');

// dotenv.config();
// const env = process.env.NODE_ENV || 'development';
// const config = {
//     development: {
//         db: process.env.MONGO_URI || 'connectionstring/databasename',
//     },
// };
// module.exports = config[env];

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Configuration object
const config = {
  db: process.env.MONGO_URI || 'mongodb://localhost:27017/teamProjectDB', // Default MongoDB connection string
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key', // Default JWT secret
  port: process.env.PORT || 4000, // Default port
};

module.exports = config;