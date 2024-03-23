import * as yup from "yup";

export const userSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    phone: yup.string().required("Phone is Required"),
    address: yup.string().required("Address is Required"),
});
