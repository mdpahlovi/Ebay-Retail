import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function GithubLogin({ navigateFrom }: { navigateFrom: () => void }) {
    return (
        <Button variant="outline">
            <Github size={16} className="mr-2" />
            Github
        </Button>
    );
}
