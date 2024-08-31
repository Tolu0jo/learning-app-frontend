import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSubjectApi,
  deleteSubjectApi,
  getStudentSubjectsApi,
  getSubjectApi,
  ICreateSubject,
  IUpdateSubject,
  updateSubjectApi,
  getTeacherSubjectsApi,
} from "./subjectApi";
import { logOut } from "../auth/authApi";

export const createSubject = createAsyncThunk(
  "subjects/createSubject",
  async (credentials: ICreateSubject, { rejectWithValue }) => {
    try {
      const response = await createSubjectApi(credentials);
      return response;
    } catch (error: any) {
      if (error.response?.data.statusCode === 403) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchStudentSubjects = createAsyncThunk(
  "subjects/fetchStudentSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStudentSubjectsApi();
      return response;
    } catch (error: any) {
      if (error.response?.data.statusCode === 403) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchTeacherSubjects = createAsyncThunk(
  "subjects/fetchTeacherSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTeacherSubjectsApi();
      return response;
    } catch (error: any) {
      if (error.response?.data.statusCode === 403) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (data: IUpdateSubject, { rejectWithValue }) => {
    try {
      const response = await updateSubjectApi(data);
      return response;
    } catch (error: any) {
      if (error.response?.data.statusCode === 403) {
        logOut();
      }
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchSubjectById = createAsyncThunk(
  "subjects/fetchSubjectById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getSubjectApi(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteSubjectApi(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
