import * as Yup from "yup";

const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required!").max(50, "Full name cannot exceed 50 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required!"),
  phoneNumber: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Invalid phone number"),
  message: Yup.string().required("Message is required!").max(1000, "Message cannot exceed 1000 characters"),
});

export default schema;
