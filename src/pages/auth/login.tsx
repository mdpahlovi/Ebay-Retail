import { useAppDispatch } from "@/redux/hooks";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations";
import useNavigateWithState from "@/hooks/useNavigator";
import { setUser } from "@/redux/features/users/userSlice";
import { toast } from "react-toastify";
import Auth from "@/layout/auth";
import GoogleLogin from "@/components/auth/login/google-login";
import Form from "@/components/form";
import loginSchema from "@/validations/loginSchema";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
    const dispatch = useAppDispatch();
    const [login, { loading }] = useMutation(LOGIN);
    const { navigateTo, navigateFrom } = useNavigateWithState();

    const handleLogin = (value: { email: string; password: string }) => {
        login({ variables: value })
            .then(({ data }) => {
                if (data?.login?.id) {
                    dispatch(setUser(data.login));
                    navigateFrom();
                }
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <Auth>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                    If don't have account!{" "}
                    <button onClick={() => navigateTo("/register")} className="text-primary hover:underline">
                        Register
                    </button>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <GoogleLogin navigateFrom={navigateFrom} />
                <div className="line-x">
                    <p className="bg-background px-2">Or continue with</p>
                </div>
                <Form initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
                    <FormInput type="email" name="email" label="Email" placeholder="username@example.com" />
                    <FormInput type="password" name="password" label="Password" placeholder="6+ Characters" />
                    <FormSubmit loading={loading}>Login</FormSubmit>
                </Form>
            </CardContent>
        </Auth>
    );
}
