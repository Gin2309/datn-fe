import axiosClient from "./base.api";

export const CreateUser = async (data) => {
  try {
    const response = await axiosClient.post("auth-admin/create-user", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DisableUser = async (_id) => {
  try {
    const response = await axiosClient.patch(`auth-admin/inactive-user/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const EnableUser = async (_id) => {
  try {
    const response = await axiosClient.patch(`auth-admin/active-user/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (_id, data) => {
  try {
    const response = await axiosClient.patch(
      `auth-admin/update-user/${_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (_id) => {
  try {
    const response = await axiosClient.delete(`auth-admin/delete-user/${_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDetailsUser = async (_id) => {
  try {
    const response = await axiosClient.get(`auth-admin/detail-user/${_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUser = async (
  email,
  name,
  phone,
  rank,
  page,
  pageSize,
  from,
  to,
  min_spending,
  max_spending
) => {
  try {
    const queryParams = {
      email: email,
      name: name,
      phone: phone,
      rank: rank,
      page: page,
      pageSize: pageSize,
      from: from,
      to: to,
      min_spending,
      max_spending,
    };

    for (const key in queryParams) {
      if (queryParams[key] === "") {
        delete queryParams[key];
      }
    }

    const response = await axiosClient.get("auth-admin/list-user", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getVipUser = async (email, name, phone, page, pageSize) => {
  try {
    const queryParams = {
      email: email,
      name: name,
      phone: phone,
      page: page,
      pageSize: pageSize,
    };

    for (const key in queryParams) {
      if (queryParams[key] === "") {
        delete queryParams[key];
      }
    }

    const response = await axiosClient.get("/auth-admin/list-user?rank=VIP", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const CancelVip = async (_id) => {
  try {
    const response = await axiosClient.patch(`admin/vip/cancel-member/${_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddVip = async (_id, data) => {
  try {
    const response = await axiosClient.patch(`admin/vip/add-member/${_id}`, {
      userId: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ListCode = async (page, pageSize) => {
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

    const response = await axiosClient.get("admin/vip/list-code", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateCode = async (count) => {
  try {
    const response = await axiosClient.post("admin/vip/create-code", {
      count: parseInt(count, 10),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoyaltyHistory = async (id) => {
  try {
    const response = await axiosClient.post(`admin/loyalty/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoyalty = async (id) => {
  try {
    const response = await axiosClient.get(
      `admin/loyalty/loyalty-point/get/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
