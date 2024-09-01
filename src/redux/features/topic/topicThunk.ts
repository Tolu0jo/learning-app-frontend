import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTopicApi,
  getCompletedTopicsApi,
  getTopicApi,
  updateTopicApi,
  deleteTopicApi,
} from "./topicApi";
import { ICreateTopic, IUpdateTopic } from "./topicApi";
import { logOut } from "../auth/authApi";

export const createTopic = createAsyncThunk(
  "topics/create",
  async (topicData: ICreateTopic, { rejectWithValue }) => {
    try {
      return await createTopicApi(topicData);
    } catch (error: any) {
      if (
        error.response?.data.statusCode === 403 ||
        error.response?.data.statusCode === 401
      ) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const getCompletedSubjectTopics = createAsyncThunk(
  "topics/getAll",
  async (subjectId: string, { rejectWithValue }) => {
    try {
      return await getCompletedTopicsApi(subjectId);
    } catch (error: any) {
      if (
        error.response?.data.statusCode === 403 ||
        error.response?.data.statusCode === 401
      ) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const getTopic = createAsyncThunk(
  "topics/get",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getTopicApi(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateTopic = createAsyncThunk(
  "topics/update",
  async (topicData: IUpdateTopic, { rejectWithValue }) => {
    try {
      return await updateTopicApi(topicData);
    } catch (error: any) {
      if (
        error.response?.data.statusCode === 403 ||
        error.response?.data.statusCode === 401
      ) {
        logOut();
      }
    }
  }
);

export const deleteTopic = createAsyncThunk(
  "topics/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteTopicApi(id);
    } catch (error: any) {
      if (
        error.response?.data.statusCode === 403 ||
        error.response?.data.statusCode === 401
      ) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
