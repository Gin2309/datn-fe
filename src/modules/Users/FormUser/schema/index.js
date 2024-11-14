import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .trim()
    .required("Đây là trường bắt buộc!"),
  fullName: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .trim()
    .required("Đây là trường bắt buộc!"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Số điện thoại phải là số")
    .length(10, "Số điện thoại phải có 10 ký tự")
    .required("Đây là trường bắt buộc!"),
  password: yup.string().when("$mode", (mode, schema) => {
    if (mode === "add") {
      return schema
        .required("Đây là trường bắt buộc!")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(16, "Mật khẩu không được quá 16 ký tự")
        .matches(/^\S*$/, "Mật khẩu không được chứa khoảng trắng");
    }
    return schema;
  }),
  email: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .email("Email không hợp lệ")
    .required("Đây là trường bắt buộc!"),
  role: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .required("Đây là trường là bắt buộc"),
  birthDate: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .required("Đây là trường là bắt buộc"),
});
