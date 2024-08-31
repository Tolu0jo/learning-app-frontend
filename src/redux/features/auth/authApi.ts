import axiosInstance from "../../api/axiosInstance";

export interface IRegister {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export const loginApi = async (credentials: IRegister) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  console.log(response);
  if (response.data.access_token) {
    localStorage.setItem("access_token", response.data.access_token);
  }
  return response.data;
};

export const registerApi = async (credentials: IRegister) => {
  const response = await axiosInstance.post("/auth/register", credentials);

  return response.data;
};

export const logOut = () => {
  localStorage.removeItem("access_token");
  window.location.href = '/';
};
