const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const { setupSocket } = require('./sockets/socketHandler');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set('io', io);
setupSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Socket.io ready`);
});
