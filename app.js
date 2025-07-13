const express = require('express');
const cors = require('cors');
const app = express();
const entriesRoutes = require('./routes/entriesRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/entries', entriesRoutes);

module.exports = app;
