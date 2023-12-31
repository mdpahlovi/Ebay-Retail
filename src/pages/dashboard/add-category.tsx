import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "@/components/form";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";

type CategoryInput = { image: string; name: string };
const categorySchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    image: yup.string().required("Image is Required"),
});

export default function Categories() {
    const navigate = useNavigate();
    const [createCategory, { loading }] = useMutation(CREATE_CATEGORY);

    const handleSubmit = (data: CategoryInput) => {
        createCategory({ variables: data })
            .then(({ data }: { data?: { createCategory: { id: string } } }) => {
                if (data?.createCategory) toast.success("Category Added Successfully");
                navigate("/dashboard/categories");
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <h1>Add New Category</h1>
            <Form initialValues={{ name: "", image: "" }} validationSchema={categorySchema} onSubmit={handleSubmit}>
                <FormImageUpload name="image" />
                <FormInput name="name" label="Name" />
                <FormSubmit loading={loading}>Submit</FormSubmit>
            </Form>
        </>
    );
}
