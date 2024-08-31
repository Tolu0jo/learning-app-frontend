import axiosInstance from "../../api/axiosInstance";

export interface ICreateSubject {
  title: string;
}
export interface IUpdateSubject {
    title: string;
    id: string;
  }
export const createSubjectApi = async (credentials: ICreateSubject) => {
  const response = await axiosInstance.post("/subjects", credentials);

  return response.data;
};

export const getStudentSubjectsApi = async () => {
  const response = await axiosInstance.get("/subjects");

  return response.data;
};


export const getTeacherSubjectsApi = async () => {
    const response = await axiosInstance.get("/subjects/topics/learners");
  
    return response.data;
  };

export const getSubjectApi = async (id: string) => {
  const response = await axiosInstance.get(`/subjects/${id}`);
  return response.data;
};
export const deleteSubjectApi = async (id: string) => {
    const response = await axiosInstance.delete(`/subjects/${id}`);
    return response.data;
  };

export const updateSubjectApi = async (data: IUpdateSubject) => {
  const response = await axiosInstance.patch(`/subjects/${data.id}`, {
    title: data.title,
  });
  return response.data;
};
