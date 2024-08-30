import axiosInstance from "../../api/axiosInstance";


export interface IRegister{
  email: string;
  password: string;
  role?: string;
}


export const loginApi = async (credentials: IRegister) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  if (response.data.userToken) {
    localStorage.setItem("access_token", response.data.access_token);
  }
  return response.data;
};

export const registerApi = async (credentials:IRegister ) => {
  const response = await axiosInstance.post("/auth/register", credentials);

  return response.data;
};

export const logoutApi = () => {
  localStorage.removeItem("access_token");
};
