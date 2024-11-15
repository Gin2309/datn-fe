import axiosClient from "./base.api";

export const createSubject = async (data) => {
  try {
    const response = await axiosClient.post("subjects", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubjectList = async (page, pageSize) => {
  try {
    const queryParams = {
      page: page,
      pageSize: pageSize,
    };

    for (const key in queryParams) {
      if (queryParams[key] === "") {
        delete queryParams[key];
      }
    }

    const response = await axiosClient.get("subjects", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDetailSubject = async (id) => {
  try {
    const response = await axiosClient.get(`subjects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteSubject = async (id) => {
  try {
    const response = await axiosClient.delete(`subjects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSubject = async (id, data) => {
  try {
    const response = await axiosClient.put(`subjects/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
