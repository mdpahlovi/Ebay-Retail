import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { UPDATE_USER } from "@/graphql/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "@/types/data";
import { userSchema } from "@/validations/userSchema";
import { updateUserValues } from "@/lib/initialValues";
import Loader from "@/components/ui/loader";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormImageUpload from "@/components/form/FormImageUpload";

export default function EditUser() {
    const params = useParams();
    const navigate = useNavigate();
    const { data, loading } = useQuery(GET_USER, { fetchPolicy: "no-cache", variables: { id: params?.id } });
    const [updateUser, { loading: updateLoading, error }] = useMutation(UPDATE_USER);

    const handleBook = (data: User) => {
        updateUser({ variables: { id: params?.id, data } })
            .then(({ data }: { data?: { updateUser: { id: string; role: string } } }) => {
                if (data?.updateUser) {
                    toast.success("User Updated Successfully");
                    navigate(`/dashboard/all-${data?.updateUser?.role}`);
                }
            })
            .catch((error) => toast.error(error.message));
    };

    console.log(error);

    if (loading) return <Loader />;

    return (
        <>
            <h1>Edit {data?.user?.name}</h1>
            <Form initialValues={updateUserValues(data?.user)} validationSchema={userSchema} onSubmit={handleBook}>
                <FormImageUpload name="image" avatar />
                <FormInput name="name" label="Full Name" />
                <FormInput name="phone" label="Phone Number" />
                <FormInput name="address" label="Address" />
                <FormSubmit loading={updateLoading}>Submit</FormSubmit>
            </Form>
        </>
    );
}
