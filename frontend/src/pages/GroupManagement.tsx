import React from 'react';
import GroupList from '../components/Groups/GroupList';

const GroupManagement = () => (
  <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Group Management</h2>
    <GroupList />
  </div>
);

export default GroupManagement;