import { Skeleton } from "@/components/ui/skeleton";

export default function ChatBodyLoading() {
    return (
        <div className="space-y-4 py-5 min-h-[calc(100vh_-_226px)]">
            {["156", "230", "196", "256"].map((width, idx) => {
                const right = idx % 2 !== 0;
                return (
                    <div key={idx} className={`flex items-end ${right ? "flex-row-reverse" : "flex-row"} gap-2`}>
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton
                            style={{ width: `${width}px` }}
                            className={`h-10 rounded-lg ${right ? "rounded-br-none" : "rounded-bl-none"}`}
                        />
                    </div>
                );
            })}
        </div>
    );
}
