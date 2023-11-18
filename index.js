const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const escapeHtml = require('escape-html'); // Add this line

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    const sanitizedMsg = escapeHtml(msg); // Sanitize the message
    io.emit('chat message', sanitizedMsg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
