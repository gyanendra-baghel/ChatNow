import { Server } from "socket.io";
// import {chatMessage} from "../models/chat-message.model"


const socketHandler = (server) => {

  const io = new Server(server ,{
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
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
      console.log({ ...msg, sender: username });
      const targetSocketId = onlineUsers.get(msg.receiver);
      if (targetSocketId) {
        io.to(targetSocketId).emit("message", { ...msg, sender: username });
      }

      // // Assuming you want to save the chat messages to the database
      // try {
      // //   const chat = new ChatMessage({ ...msg, sender: username, receiver: msg.receiver });
      // //   await chat.save();
      // } catch (error) {
      //   console.error("Error saving chat message to the database:", error);
      // }
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
  });
}

export default socketHandler