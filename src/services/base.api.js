import axios from "axios";
import { toast } from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let hasShown401Message = false;

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("tokens"));
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.removeItem("tokens");
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        const { message } = data;
        if (message === "Unauthorized") {
          if (!hasShown401Message) {
            toast.error("Phiên đăng nhập hết hạn");
            hasShown401Message = true;
          }
          logout();
        } else {
          toast.error(message || "Đã xảy ra lỗi. Vui lòng thử lại.");
        }
      } else if (status === 400 && data.message === "Token not found") {
        if (!hasShown401Message) {
          toast.error("Token không tìm thấy. Vui lòng đăng nhập lại.");
          hasShown401Message = true;
        }
        logout();
      } else {
        toast.error(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } else {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
