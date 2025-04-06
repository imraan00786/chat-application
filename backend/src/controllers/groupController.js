const Group = require('../models/Group');
const AppError = require('../utils/appError');
const GroupMemberService = require('../services/groupMemberService');

exports.createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.user.id)
    const group = await Group.create({
      name,
      createdBy: req.user.id,
    });
    await GroupMemberService.addGroupMember(group._id, req.user.id, 'admin');
    res.status(201).json({ success: true, data: group });
  } catch (err) {
    next(err);
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find().populate('name');
    res.status(200).json({ success: true, data: groups });
  } catch (err) {
    next(err);
  }
};
