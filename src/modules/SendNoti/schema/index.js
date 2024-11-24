import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Đây là trường bắt buộc!"),
  content: yup.string().required("Đây là trường bắt buộc!"),
  recipientIds: yup.array().required("Đây là trường bắt buộc!"),
});
