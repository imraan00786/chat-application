import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const selectMessages = (state: RootState) => state.chat.messages;

export const selectTypingUsers = (state: RootState) => state.chat.typingUsers;

export const selectSelectedGroupId = (state: RootState) => state.chat.selectedGroupId;

export const selectMessagesByGroup = createSelector(
  [selectMessages, selectSelectedGroupId],
  (messages, groupId) => messages.filter(msg => msg.groupId === groupId)
);
