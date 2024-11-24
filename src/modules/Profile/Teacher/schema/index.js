import * as yup from "yup";

export const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d+$/, "Số điện thoại phải là số")
    .length(10, "Số điện thoại phải có 10 ký tự")
    .required("Đây là trường bắt buộc!"),
  email: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .email("Email không hợp lệ")
    .required("Đây là trường bắt buộc!"),
});
