import * as Yup from "yup";

const schema = Yup.object().shape({
  content: Yup.string().required("Content is required."),
});

export default schema;
