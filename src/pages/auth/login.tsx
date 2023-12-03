import Auth from "@/layout/auth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtSign, Github } from "lucide-react";

export default function Login() {
    return (
        <Auth>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                    If don't have account!{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Register
                    </Link>
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
                <Form initialValues={{ email: "", password: "" }} onSubmit={(value) => console.log(value)}>
                    <FormInput type="email" name="email" label="Email" placeholder="username@example.com" />
                    <FormInput type="password" name="password" label="Password" placeholder="6+ Characters" />
                    <FormSubmit>Login</FormSubmit>
                </Form>
            </CardContent>
        </Auth>
    );
}
