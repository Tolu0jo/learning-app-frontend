import { createSlice } from "@reduxjs/toolkit";
import {
  createTopic,
  getCompletedSubjectTopics,
  getTopic,
  updateTopic,
  deleteTopic,
} from "./topicThunk";

export interface CompletedTopics {
  title: string;
  id: string;
}

interface TopicState {
  topics: any[];
  completedTopics: CompletedTopics[];
  currentTopic: any | null;
  loading: boolean;
  error: string | null;
  topic: any;
  success: string | null;
}

const initialState: TopicState = {
  topics: [],
  currentTopic: null,
  topic: null,
  loading: false,
  error: null,
  completedTopics: [],
  success: null,
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetTopicState: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createTopic
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topic = action.payload;
        state.success = "Topic created successfully";
      })
      .addCase(createTopic.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getTopics
      .addCase(getCompletedSubjectTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompletedSubjectTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.completedTopics = action.payload;
      })
      .addCase(getCompletedSubjectTopics.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getTopic
      .addCase(getTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTopic = action.payload;
      })
      .addCase(getTopic.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateTopic
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Topic updated successfully";
      })
      .addCase(updateTopic.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteTopic
      .addCase(deleteTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Topic deleted successfully";
      })
      .addCase(deleteTopic.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTopicState } = topicSlice.actions;
export default topicSlice.reducer;
