const express = require("express");
const app = express(); // create express app
const path = require("path");

// add middlewear:
//the build folder will be created inside react-app folder, we are creating a path for the build folder located outside the server folder.
app.use(express.static(path.join(__dirname, "..", "build")));
// informs Express.js to serve all the files from public folder
app.use(express.static("public"));

// in order to use routing:
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 7000
app.listen(7000, () => {
  console.log("server started on port 7000");
});