
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchGroups, selectGroups, selectSelectedGroup, setSelectedGroup } from '../../features/group/groupSlice';
import GroupItem from './GroupItem';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const selectedGroup = useAppSelector(selectSelectedGroup);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-2">
      {groups.map(group => (
        <GroupItem
          key={group.id}
          group={group}
          isSelected={selectedGroup?.id === group.id}
          onSelect={() => dispatch(setSelectedGroup(group))}
        />
      ))}
    </div>
  );
};

export default GroupList;
