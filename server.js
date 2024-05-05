
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(cors());
const API_KEY = "23-53063-3";
const apiKeyCheck = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

let price = 50;
app.post('/sum', apiKeyCheck, (req, res) => {
 
  price--;
   const { num1, num2 } = req.body;
  const value1 = parseFloat(num1);
  const value2 = parseFloat(num2);

  const sum = value1 + value2;


  res.json({ sum, price });
});


app.get('/price', (req, res) => {

  res.json({ price });
});


app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'price.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
