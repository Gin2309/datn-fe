import axiosClient from ".";

export function sendMail(payload: any) {
  return axiosClient.post("mail/contact", payload);
}

export function sendFeedBack(payload: any) {
  return axiosClient.post("feedback", payload);
}
