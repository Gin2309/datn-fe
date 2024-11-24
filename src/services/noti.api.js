import axiosClient from "./base.api";

export const sendNoti = async (data) => {
  try {
    const response = await axiosClient.post("notifications/send", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNoti = async () => {
  try {
    const response = await axiosClient.get("notifications");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
