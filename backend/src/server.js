// server.js
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { setupSocket } = require('./sockets/chatSocket');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // Adjust per environment
    methods: ['GET', 'POST']
  }
});

// Expose io instance globally to be used in controllers
app.set('io', io);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log('MongoDB connected');

  // Initialize Socket.io handlers
  setupSocket(io);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
