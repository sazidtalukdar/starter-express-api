// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Create an Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Define your API key
const API_KEY = "23-53063-3";

// Middleware to check API key
const apiKeyCheck = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Initialize price
let price = 50;

// Define a POST route to receive the values and return their sum
app.post('/sum', apiKeyCheck, (req, res) => {
  // Decrease the price by 1 for each API call
  price--;

  // Extract the values from the request body
  const { num1, num2 } = req.body;

  // Check if both values are provided
  // if (num1 === undefined || num2 === undefined) {
  //   return res.status(400).json({ error: "Both 'num1' and 'num2' are required." });
  // }

  // Convert the values to numbers
  // const value1 = parseFloat(num1);
  // const value2 = parseFloat(num2);
  const value1 = parseFloat(num1);
  const value2 = parseFloat(num2);

  // Check if the values are valid numbers
  // if (isNaN(value1) || isNaN(value2)) {
  //   return res.status(400).json({ error: "Invalid input. Both 'num1' and 'num2' must be numbers." });
  // }

  // Calculate the sum
  const sum = value1 + value2;

  // Send JSON response with sum and updated price
  res.json({ sum, price });
});

// Define a GET route to return the current price
app.get('/price', (req, res) => {
  // Send JSON response with the current price
  res.json({ price });
});

// Serve the price.html file
app.get('/', (req, res) => {
  // Read HTML file
  res.sendFile(path.join(__dirname, 'price.html'));
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
