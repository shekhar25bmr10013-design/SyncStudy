const Participant = require('../models/Participant');
const Message = require('../models/Message');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('joinRoom', ({ sessionId, userId, userName }) => {
      socket.sessionId = sessionId;
      socket.userId = userId;
      socket.join(`session_${sessionId}`);
      
      console.log(`User ${userName} joined session ${sessionId}`);
      socket.to(`session_${sessionId}`).emit('userJoined', { userId, userName });
    });

    socket.on('sendMessage', async ({ sessionId, userId, userName, message }) => {
      Message.create(sessionId, userId, userName, message);
      
      io.to(`session_${sessionId}`).emit('receiveMessage', {
        id: Date.now(),
        sender_id: userId,
        sender_name: userName,
        text: message,
        timestamp: new Date()
      });
    });

    socket.on('userActive', async ({ sessionId, userId }) => {
      Participant.setActive(sessionId, userId, true);
      socket.to(`session_${sessionId}`).emit('userStatusChange', { userId, isActive: true });
    });

    socket.on('userInactive', async ({ sessionId, userId }) => {
      Participant.setActive(sessionId, userId, false);
      socket.to(`session_${sessionId}`).emit('userStatusChange', { userId, isActive: false });
    });

    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
      if (socket.sessionId && socket.userId) {
        Participant.setActive(socket.sessionId, socket.userId, false);
        io.to(`session_${socket.sessionId}`).emit('userStatusChange', { 
          userId: socket.userId, 
          isActive: false 
        });
      }
    });
  });
};

module.exports = { setupSocket };
