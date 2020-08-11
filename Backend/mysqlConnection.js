const mysql = require('mysql');
const dotenv = require('dotenv');

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

mysqlConnection.connect(function (err) {
  if (!err) {
    console.error("Connected");
  }
  console.log('Connection failed');
})

module.exports = mysqlConnection;