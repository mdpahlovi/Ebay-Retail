import { AvatarWithFallback } from "@/components/ui/avatar";

export default function ChatHeader() {
    return (
        <div className="z-20 sticky top-0 bg-background border-b py-5 flex items-center gap-2">
            <div className="relative">
                <span className="z-10 absolute text-green-500 -right-2 -bottom-2">
                    <svg width={20} height={20}>
                        <circle cx={6} cy={6} r={6} fill="currentColor" />
                    </svg>
                </span>
                <AvatarWithFallback src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" />
            </div>
            <div className="space-y-0.5">
                <h4 className="leading-none">Anderson Vanhron</h4>
                <p className="leading-none">Junior Developer</p>
            </div>
        </div>
    );
}
