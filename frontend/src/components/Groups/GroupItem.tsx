import React from 'react';
import { Group } from '../../types';

type Props = {
  group: Group;
  isSelected: boolean;
  onSelect: () => void;
};

const GroupItem: React.FC<Props> = ({ group, isSelected, onSelect }) => {
  return (
    <div
      className={`p-3 rounded cursor-pointer ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
      onClick={onSelect}
    >
      <h3 className="font-semibold">{group.name}</h3>
      <p className="text-sm text-gray-500">{group.members.length} members</p>
    </div>
  );
};

export default GroupItem;
