import * as yup from "yup";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "@/layout/auth";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createUser } from "@/redux/features/users/userSlice";
import { toast } from "react-toastify";

const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    c_password: yup
        .string()
        .required("Please retype your password.")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export default function Register() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const from = state?.from || "/";
    const { isLoading, isError, error, user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

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
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                    If already have an account!{" "}
                    <button onClick={() => navigate("/login", { state: { from }, replace: true })} className="text-primary hover:underline">
                        Login
                    </button>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form
                    initialValues={{ name: "", email: "", password: "", c_password: "" }}
                    validationSchema={registerSchema}
                    onSubmit={(value) => dispatch(createUser(value))}
                >
                    <FormInput name="name" label="Name" placeholder="Your Name" />
                    <FormInput type="email" name="email" label="Email" placeholder="username@example.com" />
                    <FormInput type="password" name="password" label="Password" placeholder="6+ Characters" />
                    <FormInput type="password" name="c_password" label="Confirm Password" placeholder="Retype Password" />
                    <FormSubmit loading={isLoading}>Create account</FormSubmit>
                </Form>
            </CardContent>
        </Auth>
    );
}
