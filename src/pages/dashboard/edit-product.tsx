import { useQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCT } from "@/graphql/queries";
import { UPDATE_PRODUCT } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { Category, Product } from "@/types/data";
import { updateProductValues } from "@/lib/initialValues";
import createProductSchema from "@/validations/createProductSchema";
import Form from "@/components/form";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormInput from "@/components/form/FormInput";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormSubmit from "@/components/form/FormSubmit";
import FormSelect from "@/components/form/FormSelect";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";

export default function EditProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: categoriesData } = useQuery(GET_CATEGORIES);
    const { data, loading } = useQuery(GET_PRODUCT, { fetchPolicy: "no-cache", variables: { id: params?.id } });
    const [updateProduct, { loading: updateLoading }] = useMutation(UPDATE_PRODUCT);

    const categories = (categories: Category[] | undefined) => {
        if (categories) {
            return categories.map(({ id, name }: Category) => {
                return { value: id, text: name };
            });
        } else {
            return [];
        }
    };

    const handleSubmit = (data: Product) => {
        updateProduct({ variables: { id: params?.id, data } })
            .then(({ data }: { data?: { updateProduct: { id: string } } }) => {
                if (data?.updateProduct) toast.success("Product Updated Successfully");
                navigate("/dashboard/products");
            })
            .catch((error) => toast.error(error.message));
    };

    if (loading) return <Loader />;

    return (
        <>
            <h1>Edit {data?.product?.name}</h1>
            <Form initialValues={updateProductValues(data?.product)} validationSchema={createProductSchema} onSubmit={handleSubmit}>
                <FormImageUpload name="image" />
                <div className="grid sm:grid-cols-[4fr_8fr] gap-5">
                    <FormSelect name="category" label="Select Category" values={categories(categoriesData?.categories)} />
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
                <FormSubmit loading={updateLoading}>Submit</FormSubmit>
            </Form>
        </>
    );
}
