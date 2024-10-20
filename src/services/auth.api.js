import axiosClient from "./base.api";

export const Login = async (data) => {
  try {
    const response = await axiosClient.post("auth-admin/login-admin", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRefreshToken = async (data) => {
  try {
    const response = await axiosClient.post("auth-admin/refresh-tokens", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRole = async (data) => {
  try {
    const response = await axiosClient.post("roles/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendNotification = async (data) => {
  try {
    const response = await axiosClient.post("auth-admin/send-noti", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
