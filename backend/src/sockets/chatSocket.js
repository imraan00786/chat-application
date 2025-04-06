// sockets/chatSocket.js

const { decryptMessage, encryptMessage } = require('../services/encryptionService');
const { generateSmartReply } = require('../services/smartReplyService');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinGroup', ({ groupId }) => {
        socket.join(groupId);
    });

    socket.on('leaveGroup', ({ groupId }) => {
        socket.leave(groupId);
    });

    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
      socket.to(roomId).emit('userJoined', { userId });
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
      socket.leave(roomId);
      console.log(`User ${userId} left room ${roomId}`);
      socket.to(roomId).emit('userLeft', { userId });
    });

    socket.on('typing', ({ roomId, userId }) => {
      socket.to(roomId).emit('typing', { userId });
    });

    socket.on('stopTyping', ({ roomId, userId }) => {
      socket.to(roomId).emit('stopTyping', { userId });
    });

    socket.on('sendMessage', async ({ roomId, message, userId }) => {
      try {
        const encrypted = encryptMessage(message);
        io.to(roomId).emit('newMessage', {
          userId,
          encryptedMessage: encrypted,
          timestamp: new Date().toISOString(),
        });

        // Optionally generate smart reply
        const smartReply = await generateSmartReply(message);
        if (smartReply) {
          io.to(roomId).emit('smartReply', {
            message: smartReply,
            generatedBy: 'AI',
          });
        }
      } catch (err) {
        console.error('Socket message error:', err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('messageRead', ({ roomId, messageId, userId }) => {
      socket.to(roomId).emit('messageRead', { messageId, userId });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
    // For real-time editing
    socket.on('editMessage', ({ messageId, content }) => {
        io.emit('messageEdited', { messageId, content });
    });

    // For real-time deletion
    socket.on('deleteMessage', (messageId) => {
        io.emit('messageDeleted', { messageId });
    });
  });
};

module.exports = { setupSocket };
