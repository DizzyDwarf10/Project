require("dotenv").config();
const mysql = require("mysql2/promise");

const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const query = async (sql, binding = []) => {
  try {
    const [rows] = await con.query(sql, binding);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = { con, query };