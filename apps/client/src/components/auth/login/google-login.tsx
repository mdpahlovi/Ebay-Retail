import axios from "axios";
import { AtSign } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { SOCIAL_LOGIN } from "@/graphql/mutations";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useGoogleLogin } from "@react-oauth/google";

const googleapi = axios.create({ baseURL: "https://www.googleapis.com/oauth2/v1" });

export default function GoogleLogin() {
    const { loginUser } = useAuthToken();
    const [socialLogin] = useMutation(SOCIAL_LOGIN);

    const handleClick = useGoogleLogin({
        onSuccess: ({ access_token }) => {
            googleapi
                .get("/userinfo", { params: { access_token }, headers: { Authorization: `Bearer ${access_token}` } })
                .then(({ data: { name, email, picture } }) => {
                    socialLogin({ variables: { name, email, image: picture, provider: "google" } })
                        .then(({ data }) => loginUser(data?.socialLogin))
                        .catch(() => toast.error("Google Login Failed"));
                })
                .catch(() => toast.error("Google Login Failed"));
        },
        onError: () => toast.error("Google Login Failed"),
    });

    return (
        <Button variant="outline" onClick={() => handleClick()}>
            <AtSign size={16} className="mr-2" />
            Login With Google
        </Button>
    );
}
