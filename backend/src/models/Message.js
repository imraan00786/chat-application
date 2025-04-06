
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isEdited: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  vector: {
    type: [Number], // Embedding vector for similarity search
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if already compiled
module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);

