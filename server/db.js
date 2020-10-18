// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "users"
knex.schema
  // Make sure no "users" table exists
  // before trying to create new
  .hasTable('users')
    .then((exists) => {
      if (!exists) {
        // If no "users" table exists
        // create new
        // and use "id" as a primary identification
        // and increment "id" with every new record (user)
        return knex.schema.createTable('users', (table)  => {
          table.increments('id').primary()
          table.string('firstName')
          table.string('lastName')
          table.string('email')
          table.string('street1')
          table.string('street2')
          table.string('city')
          table.string('state')
          table.string('zip')
          table.string('phone')
          table.string('ccNum')
          table.string('exp')
          table.integer('quantity')
          table.string('total')
          table.string('orderDate')
          table.boolean('fulfilled')
        })
        .then(() => {
          // Log success message
          console.log('Table \'users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('User table already exists')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Export the database
module.exports = knex