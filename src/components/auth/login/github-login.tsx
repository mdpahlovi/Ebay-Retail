import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { toast } from "react-toastify";

export default function GithubLogin({ navigateFrom }: { navigateFrom: () => void }) {
    return (
        <Button variant="outline" onClick={() => toast.error("Currently not available")}>
            <Github size={16} className="mr-2" />
            Github
        </Button>
    );
}
