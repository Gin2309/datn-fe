import axiosClient from "./base.api";

export const createClasses = async (data) => {
  try {
    const response = await axiosClient.post("classes", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClassesList = async (page, pageSize) => {
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

    const response = await axiosClient.get("classes", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDetailClasses = async (id) => {
  try {
    const response = await axiosClient.get(`classses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteClasses = async (id) => {
  try {
    const response = await axiosClient.delete(`classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateClasses = async (id, data) => {
  try {
    const response = await axiosClient.put(`classes/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
