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

async function getChats(username) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute("SELECT * FROM chats WHERE receiver=?", [username]);
        connection.release();
        return rows;
    } catch (err) {
        console.log(err);
    }
}
async function saveChat(sender, receiver, msg) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute("INSERT INTO chats (sender,receiver,msg) VALUES (?,?,?)", [sender, receiver, msg]);
        connection.release();
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getSocketId(username) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute("SELECT * FROM users WHERE username=?", [username]);
        connection.release();
        return rows;
    } catch (err) {
        console.log(err);
    }
}
async function updateSocketId(username, socketId) {
    try {
        const connection = await pool.getConnection();
        await connection.execute("UPDATE users SET socket_id = ? WHERE username=?", [socketId, username]);
        connection.release();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getSocketId,
    updateSocketId,
    getChats,
    saveChat,
}
// var sql = "";
