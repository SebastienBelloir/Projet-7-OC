const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
})

mysqlConnection.connect(function (err) {
  if (!err) {
    console.error("Connection successful");
  }else{
  console.log('Connection failed' + mysqlConnection.state);} 
})

module.exports = mysqlConnection;