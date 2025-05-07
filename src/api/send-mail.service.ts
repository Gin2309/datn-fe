import axiosClient from ".";

// export function sendMail(payload: any) {
//   return axiosClient.post("mail/test", payload);
// }

export function sendMail(payload: any) {
  return axiosClient.post("mail/contact-form", payload);
}

export function sendFeedBack(payload: any) {
  return axiosClient.post("feedback", payload);
}
