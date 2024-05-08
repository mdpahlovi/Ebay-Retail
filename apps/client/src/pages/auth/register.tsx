import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/mutations";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useNavigateWithState } from "@/hooks/useNavigator";
import Auth from "@/layout/auth";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import registerSchema from "@/validations/registerSchema";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialValues = { name: "", email: "", password: "", c_password: "" };
type InitialValue = { name: string; email: string; password: string; c_password: string };

export default function Register() {
    const [register, { loading }] = useMutation(REGISTER);
    const { navigateTo } = useNavigateWithState();
    const { loginUser } = useAuthToken();

    const handleRegister = (value: InitialValue) => {
        register({ variables: value })
            .then(({ data }) => loginUser(data?.register))
            .catch((error) => toast.error(error.message));
    };

    return (
        <Auth>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                    If already have an account!{" "}
                    <button onClick={() => navigateTo("/login")} className="text-primary hover:underline">
                        Login
                    </button>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleRegister}>
                    <FormInput name="name" label="Name" placeholder="Your Name" />
                    <FormInput type="email" name="email" label="Email" placeholder="username@example.com" />
                    <FormInput type="password" name="password" label="Password" placeholder="6+ Characters" />
                    <FormInput type="password" name="c_password" label="Confirm Password" placeholder="Retype Password" />
                    <FormSubmit loading={loading}>Create account</FormSubmit>
                </Form>
            </CardContent>
        </Auth>
    );
}
