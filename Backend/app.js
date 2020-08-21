const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/messages', articlesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;