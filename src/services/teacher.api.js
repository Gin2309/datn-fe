import axiosClient from "./base.api";

export const createTeacher = async (data) => {
  try {
    const response = await axiosClient.post("admin/teachers", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTeacherList = async (
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

    const response = await axiosClient.get("admin/teachers", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
