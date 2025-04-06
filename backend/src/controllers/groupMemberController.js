
// controllers/groupMemberController.js
const GroupMember = require('../models/GroupMember');

// Add member to group
exports.addGroupMember = async (req, res, next) => {
    try {
      const { groupId, userId, role } = req.body;
      if(req.user.id == userId) this.role = 'admin';

      const exists = await GroupMember.findOne({ groupId: groupId, userId: userId });
      if (exists) return res.status(400).json({ message: 'User already a member' });
      console.log(req.body)
      const newMember = await GroupMember.create({ groupId: groupId, userId: userId });
  
      const io = req.app.get('io');
      io.to(groupId).emit('group:memberAdded', { groupId, userId });
  
      res.status(201).json(newMember);
    } catch (err) {
      next(err);
    }
  };

exports.getMembersByGroup = async (req, res, next) => {
  try {
    const members = await GroupMember.find({ groupId: req.params.groupId }).populate('userId');
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};


// Remove member from group
exports.removeGroupMember = async (req, res, next) => {
    try {
      const { groupId, memberId } = req.params;
      const memberObj = await GroupMember.findOne({ groupId: groupId, userId: userId });
      if(memberObj && memberObj.role == 'admin') return res.status(400).json({ message: 'Admin member can not be deleted' });
      const member = await GroupMember.findOneAndDelete({ _id: memberId, groupId: groupId });
      if (!member) return res.status(404).json({ message: 'Member not found' });
  
      const io = req.app.get('io');
      io.to(groupId).emit('group:memberRemoved', { groupId, userId: member.user });
  
      res.status(200).json({ message: 'Member removed successfully' });
    } catch (err) {
      next(err);
    }
  };

// Get members of a group with pagination
exports.getGroupMembers = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { page = 1, limit = 10 } = req.query;
  
      const members = await GroupMember.find({ groupId: groupId })
        .populate('user', 'username email')
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await GroupMember.countDocuments({ groupId: groupId });
  
      res.status(200).json({
        members,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (err) {
      next(err);
    }
  };