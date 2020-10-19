// Import path module
const path = require('path')

const { Pool, Client } = require('pg')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// KEEP THIS FOR DEBUGGING!
// running locally
// const pool = new Pool({
//   user: 'Jessica',
//   host: 'localhost',
//   database: 'magic-postion-orders',
//   password: '',
//   post: 5432
// })

// Heroku deployment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = pool
