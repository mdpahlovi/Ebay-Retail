import Auth from "@/layout/auth";
import { Link } from "react-router-dom";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
    return (
        <Auth>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                    If already have an account!{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form initialValues={{ email: "", password: "" }} onSubmit={(value) => console.log(value)}>
                    <FormInput name="name" label="Name" placeholder="Your Name" />
                    <FormInput type="email" name="email" label="Email" placeholder="username@example.com" />
                    <FormInput type="password" name="password" label="Password" placeholder="6+ Characters" />
                    <FormInput type="password" name="cPassword" label="Confirm Password" placeholder="Retype Password" />
                    <FormSubmit>Create account</FormSubmit>
                </Form>
            </CardContent>
        </Auth>
    );
}
