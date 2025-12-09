const users = [
    {
        userId: 12345,
        userName: "JohnDoe",
        password: "securePassword"
    },
    {
        userId: 67890,
        userName: "JaneSmith",
        password: "anotherPassword"
    },
    {
        userId: 11223,
        userName: "AliceJohnson",
        password: "alicePassword"
    }
];

let getUsers = () => users;

const con = require('../db_connect');

async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        userId INT NOT NULL AUTO_INCREMENT,
        userName VARCHAR(25) NOT NULL UNIQUE,
        password VARCHAR(50),
        CONSTRAINT user_pk PRIMARY KEY (userId)
    )`;
    await con.query(sql);
}
createTable();

module.exports = { getUsers };