const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path');

// Import routes
const apiRoutes = require('./routes')

const PORT = process.env.PORT || 8000


const app = express(); // create express app

// add middlewear:
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//the build folder will be created inside react-app folder, we are creating a path for the build folder located outside the server folder.
app.use(express.static(path.join(__dirname, "..", "build")));
// informs Express.js to serve all the files from public folder
app.use(express.static("public"));

// Implement users route
app.use('/api/magic', apiRoutes)

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})

module.exports = app;