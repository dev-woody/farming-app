export {}
const mysql = require("mysql2");
require('dotenv').config();
let db;

try {
    db = mysql.createConnection({
        user : "root",
        password:"WENDY_739597",
        host: "127.0.0.1",
        port: 3306,
        database: "farming_app"
});
} catch (err) {
    console.error(err);
}


module.exports = db;