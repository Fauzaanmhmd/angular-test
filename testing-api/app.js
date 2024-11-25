const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/testing-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));


  app.use(cors({
    origin: 'http://localhost:4200'
  }));

const productsRouter = require('./routes/products');
app.use('/api', productsRouter);
app.use(express.static(path.join(__dirname, '../testing-app/dist/testing-app')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../testing-app/dist/testing-app/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

module.exports = app;