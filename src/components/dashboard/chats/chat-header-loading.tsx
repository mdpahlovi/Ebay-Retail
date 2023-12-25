import { Skeleton } from "@/components/ui/skeleton";

export default function ChatHeaderLoading() {
    return (
        <div className="z-20 sticky top-0 bg-background border-b py-5 flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-0.5">
                <Skeleton className="w-20 h-[18px] rounded" />
                <Skeleton className="w-32 h-4 rounded" />
            </div>
        </div>
    );
}
