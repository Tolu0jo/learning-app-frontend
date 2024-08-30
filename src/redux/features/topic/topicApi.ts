import axiosInstance from "../../api/axiosInstance";

export interface ICreateTopic {
  title: string;
  description: string;
  subjectId: string;
}

export interface IUpdateTopic {
  id: string;
  title?: string;
  description?: string;
  subjectId?: string;
}

export const createTopicApi = async (topicData: ICreateTopic) => {
  const response = await axiosInstance.post("/topics", topicData);
  return response.data;
};

export const getCompletedTopicsApi = async (subjectId: string) => {
  const response = await axiosInstance.get(`/topics/${subjectId}/subject`);
  return response.data;
};

export const getTopicApi = async (id: string) => {
  const response = await axiosInstance.get(`/topics/${id}`);
  return response.data;
};

export const updateTopicApi = async (topicData: IUpdateTopic) => {
  const response = await axiosInstance.put(`/topics/${topicData.id}`, topicData);
  return response.data;
};

export const deleteTopicApi = async (id: string) => {
  const response = await axiosInstance.delete(`/topics/${id}`);
  return response.data;
};
