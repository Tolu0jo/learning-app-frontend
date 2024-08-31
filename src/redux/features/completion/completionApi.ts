import axiosInstance from "@/redux/api/axiosInstance";
import axios from "axios";

export interface ICreateCompletion {
  topicId: string;
  subjectId: string;
}

export const createCompletionApi = async (createCompletionDto: ICreateCompletion) => {
  const response = await axiosInstance.post("/completions", createCompletionDto);
  return response.data;
};

export const getLearnerRankingsApi = async (subjectId: string) => {
  const response = await axiosInstance.get(`/completions/rankings/${subjectId}`);
  return response.data.rankings;
};
