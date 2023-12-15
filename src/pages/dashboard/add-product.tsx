import { useQuery, gql } from "@apollo/client";
import Form from "@/components/form";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormSelect from "@/components/form/FormSelect";
import { Category } from "@/types/data";
import Loader from "@/components/ui/loader";
import createProductSchema from "@/validations/createProductSchema";

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
        }
    }
`;

const initialValues = {
    category: "",
    name: "",
    image: "",
    resale_price: 0,
    original_price: 0,
    condition: "",
    description: "",
    location: "",
    purchase_date: new Date(),
};
type InitialValues = {
    category: string;
    name: string;
    image: string;
    resale_price: number;
    original_price: number;
    condition: string;
    description: string;
    location: string;
    purchase_date: string;
};
export default function AddProduct() {
    const { loading, data } = useQuery(GET_CATEGORIES);
    if (loading) return <Loader />;

    const categories = (categories: Category[] | undefined) => {
        if (categories) {
            return categories.map(({ id, name }: Category) => {
                return { value: id, text: name };
            });
        } else {
            return [];
        }
    };

    const handleSubmit = (data: InitialValues) => {
        console.log(data);
    };

    return (
        <div className="px-6 py-5 space-y-6">
            <h1>Add New Product</h1>
            <Form initialValues={initialValues} validationSchema={createProductSchema} onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-[4fr_8fr] gap-5">
                    <FormSelect name="category" label="Select Category" values={categories(data?.categories)} />
                    <FormInput name="name" label="Product Name" />
                </div>
                <FormInput name="image" label="Image URL" />
                <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput name="location" label="Location" />
                    <FormInput name="phone" label="Phone" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput type="number" name="resale_price" label="Resale Price" />
                    <FormInput type="number" name="original_price" label="Original Price" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <FormDatePicker name="purchase_date" label="Purchase Date" />
                    <FormInput name="condition" label="Condition" />
                </div>
                <FormInput name="description" label="Description" textarea />
                <FormSubmit>Submit</FormSubmit>
            </Form>
        </div>
    );
}
