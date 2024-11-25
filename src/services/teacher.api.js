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

export const getStudentList = async (id) => {
  try {
    const response = await axiosClient.get(
      `teacher/list-student?classId=${id}`
    );
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

export const addClass = async (id, data) => {
  try {
    const response = await axiosClient.patch(
      `teacher/admin/add-class/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGrade = async (data) => {
  try {
    const response = await axiosClient.post(`teacher/add-grade`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
