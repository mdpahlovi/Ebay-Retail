import { useLocation, useNavigate } from "react-router-dom";

export default function useNavigateWithState() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const from = state?.from || "/";

    const navigateTo = (path: string) => navigate(path, { state: { from }, replace: true });
    const navigateFrom = () => navigate(from, { replace: true });

    return { navigateTo, navigateFrom };
}
