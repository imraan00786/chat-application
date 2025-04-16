import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, sendMessage } from './chatAPI';
import { Message } from '../../types';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  typingUsers: string | null;
  selectedGroupId: string | null;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  typingUsers: null,
  selectedGroupId: null
};

export const fetchMessagesThunk = createAsyncThunk(
  'chat/fetchMessages',
  async (threadId: string, thunkAPI) => {
    try {
      return await fetchMessages(threadId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async (payload: { threadId: string; content: string }, thunkAPI) => {
    try {
      const { threadId, content } = payload;
      return await sendMessage(threadId, {content});
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
