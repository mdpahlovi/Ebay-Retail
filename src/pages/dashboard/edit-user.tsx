import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { UPDATE_USER } from "@/graphql/mutations";
import { toast } from "react-toastify";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import { updateUserValues } from "@/lib/initialValues";
import FormImageUpload from "@/components/form/FormImageUpload";

type UserInput = { date: string; location: string };
const userSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    phone: yup.string().required("Phone is Required"),
    image: yup.string().required("Image is Required"),
});

export default function EditUser() {
    const params = useParams();
    const navigate = useNavigate();
    const { data, loading } = useQuery(GET_USER, { fetchPolicy: "no-cache", variables: { id: params?.id } });
    const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER);

    const handleBook = (data: UserInput) => {
        updateUser({ variables: { id: params?.id, data } })
            .then(({ data }: { data?: { updateUser: { id: string; role: string } } }) => {
                if (data?.updateUser) {
                    toast.success("User Updated Successfully");
                    navigate(`/dashboard/all-${data?.updateUser?.role}`);
                }
            })
            .catch((error) => toast.error(error.message));
    };

    if (loading) return <Loader />;

    return (
        <>
            <h1>Edit {data?.user?.name}</h1>
            <Form initialValues={updateUserValues(data?.user)} validationSchema={userSchema} onSubmit={handleBook}>
                <FormImageUpload name="image" avatar />
                <FormInput name="name" label="Full Name" />
                <FormInput name="phone" label="Phone Number" />
                <FormSubmit loading={updateLoading}>Submit</FormSubmit>
            </Form>
        </>
    );
}
