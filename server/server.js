const express = require('express');
const path = require("path");
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.static('public'))

const sundaeOptionsPath = path.join(__dirname, "data", "sundae-options.json");
const sundaeOptionsData = JSON.parse(fs.readFileSync(sundaeOptionsPath));

app.get('/scoops', (req, res) => {
  res.json(sundaeOptionsData.iceCreamFlavors)
})

app.get('/toppings', (req, res) => {
  res.json(sundaeOptionsData.toppings)
})

app.post('/order', (req, res) => {
  const orderNumber = Math.floor(Math.random() * 10000000000);

  res.status(200).json({ orderNumber })
})

if (require.main === module) {
  app.listen(3030, () => console.log('Server listening on port 3030!'))
}

module.exports = app;