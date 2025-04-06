// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.sendMessage);
router.get('/:groupId', messageController.getMessages);
router.put('/:messageId', messageController.editMessage);
router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;
