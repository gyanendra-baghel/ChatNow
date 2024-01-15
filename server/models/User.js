var mysql = require('mysql2/promise');

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat_app",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10,
});

async function checkUser(username) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute("SELECT * FROM users WHERE username=?", [username]);
        connection.release();
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function saveUser(name, username, email, password) {
    try {
        const connection = await pool.getConnection();
        await connection.execute("INSERT INTO users (name,username,email,password) VALUES (?,?, ?, ?)", [name, username, email, password]);
        connection.release();
    } catch (err) {
        console.log(err);
    }
}
async function deleteUser(username) {
    try {
        const connection = await pool.getConnection();
        await connection.execute("DELETE FROM users WHERE username=?", [username]);
        connection.release();
    } catch (err) {
        console.log(err);
    }
}
async function updatePassword(username, password) {
    try {
        const connection = await pool.getConnection();
        await connection.execute("UPDATE users SET password = ? WHERE username=?", [password, username]);
        connection.release();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    checkUser,
    saveUser,
    deleteUser,
    updatePassword
}
// var sql = "";
