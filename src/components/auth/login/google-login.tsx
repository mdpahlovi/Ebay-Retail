import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { SOCIAL_LOGIN } from "@/graphql/mutations";
import { setCookies } from "@/lib/cookies";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/users/userSlice";
import decodeToken from "@/lib/decodeToken";
import { Button } from "@/components/ui/button";
import { AtSign } from "lucide-react";

export default function GoogleLogin({ navigateFrom }: { navigateFrom: () => void }) {
    const dispatch = useAppDispatch();
    const [socialLogin] = useMutation(SOCIAL_LOGIN);
    const [accessToken, setAccessToken] = useState("");
    const handleClick = useGoogleLogin({
        onSuccess: ({ access_token }) => setAccessToken(access_token),
        onError: () => toast.error("Google Login Failed"),
    });

    useEffect(() => {
        if (accessToken) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            })
                .then((res) => res.json())
                .then(({ name, email, picture }) => {
                    socialLogin({ variables: { name, email, image: picture, provider: "google" } })
                        .then(({ data }) => {
                            if (data?.socialLogin?.token) {
                                setCookies(data.socialLogin.token);
                                dispatch(setUser(decodeToken(data.socialLogin.token)));
                                navigateFrom();
                            }
                        })
                        .catch(() => toast.error("Google Login Failed"));
                })
                .catch(() => toast.error("Google Login Failed"));
        }
    }, [accessToken, dispatch, navigateFrom, socialLogin]);

    return (
        <Button variant="outline" onClick={() => handleClick()}>
            <AtSign size={16} className="mr-2" />
            Google
        </Button>
    );
}
