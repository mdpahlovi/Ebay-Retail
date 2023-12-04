import * as yup from "yup";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "@/layout/auth";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtSign, Github } from "lucide-react";
import { loginUser } from "@/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
});

export default function Login() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const from = state?.from || "/";
    const { isLoading, isError, error, user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    console.log(location);

    useEffect(() => {
        if (isError) {
            toast.error(error || "Something Error!");
        } else if (user?._id && !isLoading) {
            navigate(from, { replace: true });
        }
    }, [user, isLoading, isError, error, navigate, from]);

    return (
        <Auth>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                    If don't have account!{" "}
                    <button
                        onClick={() => navigate("/register", { state: { from }, replace: true })}
                        className="text-primary hover:underline"
                    >
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
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <Form
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={(value) => dispatch(loginUser(value))}
                >
                    <FormInput type="email" name="email" label="Email" placeholder="username@example.com" />
                    <FormInput type="password" name="password" label="Password" placeholder="6+ Characters" />
                    <FormSubmit loading={isLoading}>Login</FormSubmit>
                </Form>
            </CardContent>
        </Auth>
    );
}
