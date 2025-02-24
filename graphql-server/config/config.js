const dotenv = require('dotenv');

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        db: process.env.MONGO_URI || 'connectionstring/databasename',
    },
};
module.exports = config[env];