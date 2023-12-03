import { useEffect } from "react";
import LogoToggle from "@/components/logo-toggle";
import { Card } from "@/components/ui/card";
import { setTheme } from "@/redux/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Auth({ children }: React.PropsWithChildren) {
    const { theme } = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (!theme) {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            dispatch(setTheme(systemTheme));
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [dispatch, theme]);

    return (
        <div className="bg-auth bg-cover bg-center">
            <section className="min-h-screen grid lg:grid-cols-2 items-center">
                <LogoToggle className="hidden lg:block xl:mx-auto" />
                <Card className="w-full sm:w-[28rem] my-10 mx-auto lg:ml-auto xl:mr-10">
                    <LogoToggle className="block ml-6 mt-8 lg:hidden" />
                    {children}
                </Card>
            </section>
        </div>
    );
}
