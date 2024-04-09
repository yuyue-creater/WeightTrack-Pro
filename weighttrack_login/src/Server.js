// Import the express module
const express = require('express');

// Create a new Express application
const app = express();

// Define the port number
const port = 3001;

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
  // Send a response with the text 'Hello World!'
  res.send('Hello World!');
});





// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
