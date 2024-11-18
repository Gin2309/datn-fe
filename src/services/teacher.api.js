import axiosClient from "./base.api";

export const getTeacher = async () => {
  try {
    const response = await axiosClient.get("teachers/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTeacher = async (data) => {
  try {
    const response = await axiosClient.patch("teachers/update-profile".data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
