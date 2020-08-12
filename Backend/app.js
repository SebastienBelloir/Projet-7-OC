const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConnection = require('./mysqlConnection');

const app = express();

app.use(bodyParser.json());

app.use(cors());



module.exports = app;