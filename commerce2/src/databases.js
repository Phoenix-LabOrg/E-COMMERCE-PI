const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
    host:process.env.host || "localhost",
    user:process.env.user || "root",
    database:process.env.database || "commerce2",
    password:process.env.password || "admin"
});

const getConnection = () => connection;

module.exports = {
    getConnection
};