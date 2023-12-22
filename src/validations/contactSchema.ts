import * as yup from "yup";

const contactSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    email: yup.string().required("Email is Required").email("Email is invalid"),
    subject: yup.string().required("Subject is Required"),
    body: yup.string().required("Body is Required"),
});

export default contactSchema;
