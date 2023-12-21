import { useQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries";
import { CREATE_PRODUCT } from "@/graphql/mutations";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { Category, Product } from "@/types/data";
import { createProductValues } from "@/lib/initialValues";
import createProductSchema from "@/validations/createProductSchema";
import Form from "@/components/form";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormInput from "@/components/form/FormInput";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormSubmit from "@/components/form/FormSubmit";
import FormSelect from "@/components/form/FormSelect";

export default function AddProduct() {
    const { data } = useQuery(GET_CATEGORIES);
    const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);

    const categories = (categories: Category[] | undefined) => {
        if (categories) {
            return categories.map(({ id, name }: Category) => {
                return { value: id, text: name };
            });
        } else {
            return [];
        }
    };

    const handleSubmit = (data: Product, formikHelpers: FormikHelpers<Product>) => {
        createProduct({ variables: data })
            .then(({ data }: { data?: { createProduct: { id: string } } }) => {
                if (data?.createProduct) toast.success("Product Added Successfully");
                formikHelpers.resetForm();
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <h1>Add New Product</h1>
            <Form initialValues={createProductValues} validationSchema={createProductSchema} onSubmit={handleSubmit}>
                <FormImageUpload name="image" />
                <div className="grid sm:grid-cols-[4fr_8fr] gap-5">
                    <FormSelect name="category" label="Select Category" values={categories(data?.categories)} />
                    <FormInput name="name" label="Product Name" />
                </div>
                <FormInput name="location" label="Location" />
                <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput type="number" name="resale_price" label="Resale Price" />
                    <FormInput type="number" name="original_price" label="Original Price" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <FormDatePicker name="purchase_date" label="Purchase Date" />
                    <FormInput name="condition" label="Condition" />
                </div>
                <FormInput name="description" label="Description" textarea />
                <FormSubmit loading={loading}>Submit</FormSubmit>
            </Form>
        </>
    );
}
