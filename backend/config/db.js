const mysql = require("mysql2/promise");
require("dotenv").config();

 const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
