import EmojiPicker from "emoji-picker-react";
import { PopoverContent } from "@/components/ui/popover";
import { useAppSelector } from "@/redux/hooks";

export default function ChatIcons({ setContent }: { setContent: React.Dispatch<React.SetStateAction<string>> }) {
    const { theme } = useAppSelector((state) => state.theme);

    return (
        <PopoverContent className="mr-6 border-none rounded-lg flex justify-end p-0">
            <EmojiPicker
                height={384}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                theme={theme}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-ignore */
                emojiStyle="google"
                previewConfig={{ showPreview: false }}
                onEmojiClick={({ emoji }) => setContent((previous) => previous + emoji)}
            />
        </PopoverContent>
    );
}
