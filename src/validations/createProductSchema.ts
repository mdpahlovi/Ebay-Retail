import * as yup from "yup";

const createProductSchema = yup.object().shape({
    category: yup.string().required("Category is Required"),
    name: yup.string().required("Product name is Required"),
    image: yup.string().required("Product image is Required"),
    resale_price: yup.number().required("Resale price is Required"),
    original_price: yup.number().required("Original price is Required"),
    condition: yup.string().required("Product Condition is Required"),
    description: yup.string().required("Product Description is Required"),
    location: yup.string().required("Seller Location is Required"),
    purchase_date: yup.string().required("Purchase date is Required"),
});

export default createProductSchema;
