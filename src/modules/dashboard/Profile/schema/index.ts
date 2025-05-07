import * as Yup from "yup";

const schema = Yup.object().shape({
  avatar: Yup.string(),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?\d{9,11}$/, "Phone number must be between 9 and 11 digits"),
});

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters")
    .required("Password is required!")
    .matches(/^[^\s]+$/, "Password must not contain spaces")
    .test("no-whitespace", "Password must not contain spaces", (value) => {
      return value === value?.trim();
    }),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "New password must not exceed 32 characters")
    .required("New password is required!")
    .matches(/^[^\s]+$/, "Password must not contain spaces")
    .test("no-whitespace", "Password must not contain spaces", (value) => {
      return value === value?.trim();
    }),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm New Password is required"),
});

export { passwordSchema, schema };
