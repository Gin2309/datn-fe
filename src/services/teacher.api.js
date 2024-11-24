import axiosClient from "./base.api";

export const getTeacher = async () => {
  try {
    const response = await axiosClient.get("teacher/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudent = async () => {
  try {
    const response = await axiosClient.get("students/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTeacher = async (data) => {
  try {
    const response = await axiosClient.patch("teacher/update-profile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (data) => {
  try {
    const response = await axiosClient.patch("students/update-profile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addClass = async (id) => {
  try {
    const response = await axiosClient.patch(`teacher/add-class/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGrade = async (id) => {
  try {
    const response = await axiosClient.patch(`teacher/add-grade/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
