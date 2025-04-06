// routes/groupMemberRoutes.js
const express = require('express');
const router = express.Router();
const groupMemberController = require('../controllers/groupMemberController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, groupMemberController.addGroupMember);
router.get('/:groupId', authenticateToken, groupMemberController.getMembersByGroup);
router.delete('/:groupId/:userId', authenticateToken, groupMemberController.removeGroupMember);

module.exports = router;
