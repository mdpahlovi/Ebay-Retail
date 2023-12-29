import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServiceCard({ title, stats }: { title: string; stats: number }) {
    return (
        <CardHeader>
            <Avatar className="w-12 h-12">
                <AvatarFallback className="text-sm">{stats}+</AvatarFallback>
            </Avatar>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
                A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling
                him Big Bear.
            </CardDescription>
        </CardHeader>
    );
}
