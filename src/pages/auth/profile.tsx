import * as yup from "yup";
import { useState } from "react";
import { User } from "@/types/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMutation } from "@apollo/client";
import { PROFILE } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { updateUserValues } from "@/lib/initialValues";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormImageUpload from "@/components/form/FormImageUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/features/users/userSlice";

type UserInput = { name: string; phone: string; location: string };
const userSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    phone: yup.string().required("Phone is Required"),
});

export default function Profile() {
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const [profile, { loading: updateLoading }] = useMutation(PROFILE);

    const handleBook = (data: UserInput) => {
        profile({ variables: data })
            .then(({ data }) => {
                if (data?.profile?.id) {
                    dispatch(setUser(data.profile));
                    toast.success("Profile Updated Successful");
                }
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <section>
            <Form initialValues={updateUserValues(user as User)} validationSchema={userSchema} onSubmit={handleBook}>
                <div className="flex justify-between items-center">
                    <FormImageUpload name="image" disabled={!editing} avatar />
                    <Button type="button" variant={editing ? "default" : "destructive"} onClick={() => setEditing(!editing)}>
                        {editing ? "Cancel Edit" : "Edit Profile"}
                    </Button>
                </div>
                <FormInput name="name" label="Name" disabled={!editing} />
                <div>
                    <Label className="block mb-2">Email</Label>
                    <Input value={user?.email} disabled />
                </div>
                <FormInput name="phone" label="Phone Number" disabled={!editing} />
                {editing ? <FormSubmit loading={updateLoading}>Submit</FormSubmit> : null}
            </Form>
        </section>
    );
}
