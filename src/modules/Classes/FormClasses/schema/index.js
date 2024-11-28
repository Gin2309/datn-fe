import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .trim()
    .required("Đây là trường bắt buộc!"),
  schoolYear: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .trim()
    .required("Đây là trường bắt buộc!"),
  homeroomTeacher: yup.number().nullable(),
  studentIds: yup.array().optional(),
});
