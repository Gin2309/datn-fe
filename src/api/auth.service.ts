import axiosClient from ".";

export function Login(payload: { email: string; password: string }) {
  return axiosClient.post("login", payload);
}

export function LoginWithToken(payload: { email: string; verifyToken: string }) {
  return axiosClient.post("login/token", payload);
}

export function Register(payload: { email: string; password: string; name: string; phone: string }) {
  return axiosClient.post("register", payload);
}

export function getRefreshToken(payload: { token: string }) {
  return axiosClient.post("refresh-token", payload);
}

export function getProfile() {
  return axiosClient.get("profile");
}

export function updateProfile(payload: any) {
  return axiosClient.put("update-profile", payload);
}

export function forgetPassword(payload: { email: string }) {
  return axiosClient.post("forgot-password", payload);
}

export function changePassword(payload: { password: string; newPassword: string; confirmNewPassword: string }) {
  return axiosClient.post("change-password", payload);
}

export const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post("file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};

export const sendOrderMail = (payload: any) => {
  return axiosClient.post("/mail/order-completion", payload);
};
