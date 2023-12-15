import { useAppDispatch } from "@/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import useNavigateWithState from "@/hooks/useNavigator";
import { setCookies } from "@/lib/cookies";
import decodeToken from "@/lib/decodeToken";
import { setUser } from "@/redux/features/users/userSlice";
import { toast } from "react-toastify";
import Auth from "@/layout/auth";
import { Button } from "@/components/ui/button";
import { AtSign, Github } from "lucide-react";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import loginSchema from "@/validations/loginSchema";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export default function Login() {
    const dispatch = useAppDispatch();
    const [login, { loading }] = useMutation(LOGIN);
    const { navigateTo, navigateFrom } = useNavigateWithState();

    const handleLogin = (value: { email: string; password: string }) => {
        login({ variables: value })
            .then(({ data }) => {
                if (data?.login?.token) {
                    setCookies(data.login.token);
                    dispatch(setUser(decodeToken(data.login.token)));
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
                <div className="grid sm:grid-cols-2 gap-6">
                    <Button variant="outline">
                        <AtSign size={16} className="mr-2" />
                        Google
                    </Button>
                    <Button variant="outline">
                        <Github size={16} className="mr-2" />
                        Github
                    </Button>
                </div>
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
