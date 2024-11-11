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

export const getDetailsUser = async (_id) => {
  try {
    const response = await axiosClient.get(`admin-admin/detail-user/${_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserList = async (
  email,
  name,
  phone,
  page,
  pageSize,
  from,
  to
) => {
  try {
    const queryParams = {
      email: email,
      name: name,
      phone: phone,
      page: page,
      pageSize: pageSize,
      from: from,
      to: to,
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
