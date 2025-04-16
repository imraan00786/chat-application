

// groupSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Group, User } from '../../types';
import { groupAPI } from './groupAPI';

interface GroupState {
  groups: Group[];
  currentGroup: Group | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk('groups', async () => {
  const res = await groupAPI.getGroups();
  return res.data.data;
});

export const fetchGroupById = createAsyncThunk('group/fetchGroupById', async (groupId: string) => {
  const res = await groupAPI.getGroupById(groupId);
  return res.data;
});

export const addMemberToGroup = createAsyncThunk(
  'group/addMember',
  async ({ groupId, member }: { groupId: string; member: User }) => {
    const res = await groupAPI.addMember(groupId, member.id);
    return res.data;
  }
);

export const removeMemberFromGroup = createAsyncThunk(
  'group/removeMember',
  async ({ groupId, memberId }: { groupId: string; memberId: string }) => {
    const res = await groupAPI.removeMember(groupId, memberId);
    return res.data;
  }
);

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<Group | null>) => {
      state.currentGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch groups';
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.currentGroup = action.payload;
      })
      .addCase(addMemberToGroup.fulfilled, (state, action) => {
        const updatedGroup = action.payload;
        state.groups = state.groups.map((group) =>
          group.id === updatedGroup.id ? updatedGroup : group
        );
        if (state.currentGroup?.id === updatedGroup.id) {
          state.currentGroup = updatedGroup;
        }
      })
      .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
        const updatedGroup = action.payload;
        state.groups = state.groups.map((group) =>
          group.id === updatedGroup.id ? updatedGroup : group
        );
        if (state.currentGroup?.id === updatedGroup.id) {
          state.currentGroup = updatedGroup;
        }
      });
  },
});

export const { setCurrentGroup } = groupSlice.actions;

// Selectors
export const selectGroups = (state: { group: GroupState }) => state.group.groups;
export const selectCurrentGroup = (state: { group: GroupState }) => state.group.currentGroup;
export const selectSelectedGroup = selectCurrentGroup;
export const selectLoadingState = (state: { group: GroupState }) => state.group.loading;
export const selectError = (state: { group: GroupState }) => state.group.error;
export const setSelectedGroup = setCurrentGroup;

export default groupSlice.reducer;
