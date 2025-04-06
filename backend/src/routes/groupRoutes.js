const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, groupController.createGroup);
router.get('/', authenticateToken, groupController.getGroups);
// router.get('/my-groups', authenticateToken, groupController.getMemberGroups);


module.exports = router;