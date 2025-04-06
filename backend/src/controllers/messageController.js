// controllers/messageController.js
const Message = require('../models/Message');
const { storeMessageWithEmbedding, getSmartReplies } = require('../services/smartReplyService');


exports.sendMessage = async (req, res, next) => {
  try {
    const { groupId, senderId, content, type } = req.body;

    const message = await Message.create({
      group: groupId,
      sender: senderId,
      content,
      type,
    });

    const io = req.app.get('io');
    io.to(groupId).emit('message:new', message);

   
    await storeMessageWithEmbedding(message);

    const smartReplies = await getSmartReplies(content, groupId);
    res.status(201).json({ message, smartReplies });

    //res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const messages = await Message.find({ group: groupId })
      .populate('sender', 'username email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

// Edit message
exports.editMessage = async (req, res, next) => {
    try {
      const { messageId } = req.params;
      const { content } = req.body;
  
      const message = await Message.findById(messageId);
  
      if (!message) return res.status(404).json({ message: 'Message not found' });
  
      message.content = content;
      message.isEdited = true;
      await message.save();
  
      // Emit real-time update
      req.app.get('io').to(message.group.toString()).emit('messageEdited', message);
  
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  };
  
  // Delete message (soft delete)
  exports.deleteMessage = async (req, res, next) => {
    try {
      const { messageId } = req.params;
  
      const message = await Message.findById(messageId);
  
      if (!message) return res.status(404).json({ message: 'Message not found' });
  
      message.content = '';
      message.isDeleted = true;
      await message.save();
  
      // Emit real-time deletion
      req.app.get('io').to(message.group.toString()).emit('messageDeleted', { messageId });
  
      res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
      next(error);
    }
  };