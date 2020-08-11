const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/user');
const mysqlConnection = require('./mysqlConnection');

const app = express();

app.use(bodyParser.json());

app.use(cors());



module.exports = app;