import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/features/theme/themeSlice";

export default function ModeToggle() {
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
        <Button variant="outline" size="icon" onClick={() => dispatch(setTheme(theme == "light" ? "dark" : "light"))}>
            <Sun size={20} className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
