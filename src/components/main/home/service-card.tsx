import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ServiceCard({ title, stats }: { title: string; stats: number }) {
    return (
        <div className="max-w-md">
            <Avatar className="mb-2.5 w-12 h-12">
                <AvatarFallback>{stats}+</AvatarFallback>
            </Avatar>
            <h4>{title}</h4>
            <p>
                A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling
                him Big Bear.
            </p>
        </div>
    );
}
