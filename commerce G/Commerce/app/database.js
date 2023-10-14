const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();


const connection = mysql.createConnection({
    host:process.env.host || "",
    user:process.env.user || "",
    database:process.env.database || "",
    password:process.env.password || ""
});

const getConnection = () => connection;

module.exports = {
    getConnection
};
