import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconButton } from "@/components/ui/icon-button";
import { Mic, SendHorizontal, Smile } from "lucide-react";

export default function ChatLoader() {
    return (
        <ScrollArea className="px-6">
            {/* Header Loading */}
            <div className="z-20 sticky top-0 bg-background border-b py-5 flex items-center gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-0.5">
                    <Skeleton className="w-20 h-[18px] rounded" />
                    <Skeleton className="w-32 h-4 rounded" />
                </div>
            </div>
            {/* Body Loading */}
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
            <div className="z-20 sticky bottom-0 bg-background border-t py-5">
                <div className="relative flex">
                    <div className="absolute top-1 left-1">
                        <IconButton>
                            <Mic size={16} />
                        </IconButton>
                    </div>
                    <Input className="pl-10 pr-[9.25rem]" placeholder="Write Your Message!" />
                    <div className="absolute top-1 right-1 space-x-1">
                        <IconButton>
                            <Smile size={16} />
                        </IconButton>
                        <IconButton variant="default" disabled>
                            <SendHorizontal size={16} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}
