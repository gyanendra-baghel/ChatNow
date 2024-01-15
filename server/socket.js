const { Server } = require('socket.io');

const io = new Server(9200, {
    cors: { origin: 'http://localhost:5173' }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    if (!username) {
        console.log('User connection rejected: Username is not provided.');
        socket.disconnect(true);
        return;
    }
    if (onlineUsers.has(username)) {
        console.log(`User connection rejected: ${username} is already connected. ${socket.id}`);
        socket.disconnect(true);
        return;
    }
    console.log(`User connected: ${username} ${socket.id}`);
    onlineUsers.set(username, socket.id);
    console.log(Array.from(onlineUsers.keys()));
    io.emit("updateUser", Array.from(onlineUsers.keys()));

    socket.on("sendMessage", async (msg) => {
        console.log({ ...msg,sender: username});
        const targetSocketId = onlineUsers.get(msg.receiver);
        if (targetSocketId) {
            io.to(targetSocketId).emit("message", { ...msg,sender: username});
        }
    });
    socket.on("disconnect", async () => {
        onlineUsers.delete(username);
        io.emit("updateUser", Array.from(onlineUsers.keys()));
        console.log(`User disconnected: ${username}`);
    });
    // Error handling
    socket.on("error", (error) => {
        console.error(`Socket error for user ${username}:`, error);
    });
})