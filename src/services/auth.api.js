import axiosClient from "./base.api";

export const Login = async (data) => {
  try {
    const response = await axiosClient.post("auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
