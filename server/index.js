const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8000


const app = express(); // create express app

// add middlewear:
//the build folder will be created inside react-app folder, we are creating a path for the build folder located outside the server folder.
app.use(express.static(path.join(__dirname, "..", "build")));
// informs Express.js to serve all the files from public folder
app.use(express.static("public"));

// in order to use routing:
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})