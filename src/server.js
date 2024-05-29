// require("dotenv").config();
// const mysql = require("mysql2");

// var hostname = "eh3.h.filess.io";
// var database = "attendance_standjust";
// var port = "3307";
// var username = "attendance_standjust";
// var password = "8ff75bbbad3d3f3fa38c0dbaacddcbb171d8a099";

// var con = mysql.createConnection({
//   host: hostname,
//   database: database,
//   port: port,
//   user: username,
//   password: password,
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.query("SELECT 1+1").on("result", function (row) {
//   console.log(row);
// });

//============================================================

// require("dotenv").config();
// const mysql = require("mysql2");

// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   port: process.env.PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.query("SELECT 1+1").on("result", function (row) {
//   console.log(row);
// });

//============================================================

require("dotenv").config();
const mysql = require("mysql2");

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("SELECT 1+1").on("result", function (row) {
  console.log(row);
});

