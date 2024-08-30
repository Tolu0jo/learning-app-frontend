import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCompletionApi,
  getLearnerRankingsApi,
  ICreateCompletion,
} from "./completionApi";

export const createCompletion = createAsyncThunk(
  "completion/createCompletion",
  async (createCompletionDto: ICreateCompletion, { rejectWithValue }) => {
    try {
      return await createCompletionApi(createCompletionDto);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const getLearnerRankings = createAsyncThunk(
  "completion/getLearnerRankings",
  async (subjectId: string, { rejectWithValue }) => {
    try {
      return await getLearnerRankingsApi(subjectId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
