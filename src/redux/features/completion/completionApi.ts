import axiosInstance from "@/redux/api/axiosInstance";
import axios from "axios";

export interface ICreateCompletion {
  topicId: string;
  userId: string;
}

export const createCompletionApi = async (createCompletionDto: ICreateCompletion) => {
  const response = await axiosInstance.post("/api/completions", createCompletionDto);
  return response.data;
};

export const getLearnerRankingsApi = async (subjectId: string) => {
  const response = await axiosInstance.get(`/api/completions/rankings/${subjectId}`);
  return response.data;
};
