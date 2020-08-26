const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const articlesRoutes = require('./routes/articles');

const app = express();

app.use(bodyParser.json());

app.use(helmet());
app.use(cors());

app.use('/', userRoutes);


module.exports = app;