import { useAppDispatch } from "@/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import useNavigateWithState from "@/hooks/useNavigator";
import { setCookies } from "@/lib/cookies";
import decodeToken from "@/lib/decodeToken";
import { setUser } from "@/redux/features/users/userSlice";
import { toast } from "react-toastify";
import Auth from "@/layout/auth";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import registerSchema from "@/validations/registerSchema";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const REGISTER = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            token
        }
    }
`;

const initialValues = { name: "", email: "", password: "", c_password: "" };
type InitialValue = { name: string; email: string; password: string; c_password: string };

export default function Register() {
    const dispatch = useAppDispatch();
    const [register, { loading }] = useMutation(REGISTER);
    const { navigateTo, navigateFrom } = useNavigateWithState();

    const handleRegister = (value: InitialValue) => {
        register({ variables: value })
            .then(({ data }) => {
                if (data?.register?.token) {
                    setCookies(data.register.token);
                    dispatch(setUser(decodeToken(data.register.token)));
                    navigateFrom();
                }
            })
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
