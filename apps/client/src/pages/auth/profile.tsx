import { useState } from "react";
import { User } from "@/types/data";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { useMutation } from "@apollo/client";
import { PROFILE } from "@/graphql/mutations";
import { useAuthToken } from "@/hooks/useAuthToken";
import { updateUserValues } from "@/lib/initialValues";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import FormImageUpload from "@/components/form/FormImageUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/validations/userSchema";

export default function Profile() {
    const { updateProfile } = useAuthToken();
    const [editing, setEditing] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const [profile, { loading: updateLoading }] = useMutation(PROFILE);

    const handleBook = (data: User) => {
        profile({ variables: data })
            .then(({ data }) => updateProfile(data?.profile))
            .catch((error) => toast.error(error.message));
    };

    return (
        <section>
            <Form initialValues={updateUserValues(user!)} validationSchema={userSchema} onSubmit={handleBook}>
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
                <FormInput name="address" label="Address" disabled={!editing} />
                {editing ? <FormSubmit loading={updateLoading}>Submit</FormSubmit> : null}
            </Form>
        </section>
    );
}
