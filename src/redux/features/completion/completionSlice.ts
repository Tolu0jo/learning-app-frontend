import { createSlice } from "@reduxjs/toolkit";
import { createCompletion, getLearnerRankings } from "./completionThunk";

interface CompletionState {
  completion: any | null;
  rankings: Ranking[];
  loading: boolean;
  error: string | null;
}

interface Ranking {
  name: string;
  completedTopics:number;
  totalTopics:number;
}

const initialState: CompletionState = {
  completion: null,
  rankings: [],
  loading: false,
  error: null,
};

const completionSlice = createSlice({
  name: "completion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createCompletion
      .addCase(createCompletion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompletion.fulfilled, (state, action) => {
        state.loading = false;
        state.completion = action.payload;
      })
      .addCase(createCompletion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // getLearnerRankings
      .addCase(getLearnerRankings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLearnerRankings.fulfilled, (state, action) => {
        state.loading = false;
        state.rankings = action.payload;
      })
      .addCase(getLearnerRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default completionSlice.reducer;
