require('dotenv').config(); 
const knex = require('knex');

// Knex configuration
const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: 5432, 
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME,
    ssl: true, 
  },
};

// Initialize Knex instance
const db = knex(knexConfig);

module.exports = db;
