import React from 'react';
import { useAppSelector } from '../../app/store';
import { selectSelectedGroup } from '../../features/group/groupSlice';

const MemberList = () => {
  const selectedGroup = useAppSelector(selectSelectedGroup);

  if (!selectedGroup) return <div className="p-4 text-gray-500">No group selected</div>;

  return (
    <div className="p-4 border-t">
      <h4 className="font-bold mb-2">Members</h4>
      <ul className="space-y-1">
        {selectedGroup.members.map(member => (
          <li key={member.id} className="text-sm">
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
