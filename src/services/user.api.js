import axiosClient from "./base.api";

export const createUser = async (data) => {
  try {
    const response = await axiosClient.post("admin/users", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (_id, data) => {
  try {
    const response = await axiosClient.put(`admin/users/${_id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (_id) => {
  try {
    const response = await axiosClient.delete(`admin/users/${_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDetailsUser = async (id) => {
  try {
    const response = await axiosClient.get(`admin/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserList = async (role, keyword, page, pageSize) => {
  try {
    const queryParams = {
      role: role,
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    };

    for (const key in queryParams) {
      if (queryParams[key] === "") {
        delete queryParams[key];
      }
    }

    const response = await axiosClient.get("admin/users", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
