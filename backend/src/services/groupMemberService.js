const GroupMember = require('../models/GroupMember');


// Add member to group
exports.addGroupMember = async (groupId, userId, role) => {
    try {
        console.log(groupId); console.log(userId); console.log(role);
      const exists = await GroupMember.findOne({ groupId: groupId, userId: userId });
      if (exists) return ;
      const newMember = await GroupMember.create({ groupId: groupId, userId: userId, role });
      return newMember;

    } catch (err) {
      
    }
  };