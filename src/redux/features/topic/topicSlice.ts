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
  topic:any
}

const initialState: TopicState = {
  topics: [],
  currentTopic: null,
  topic:null,
  loading: false,
  error: null,
  completedTopics: [],
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetTopicState: (state) => {
      state.currentTopic = null;
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
      
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.topics.findIndex(
          (topic) => topic.id === action.payload.id
        );
        if (index !== -1) {
          state.topics[index] = action.payload;
        }
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
        state.topics = state.topics.filter(
          (topic) => topic.id !== action.payload.id
        );
      })
      .addCase(deleteTopic.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTopicState } = topicSlice.actions;
export default topicSlice.reducer;
