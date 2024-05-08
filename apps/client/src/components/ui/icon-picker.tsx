import EmojiPicker from "emoji-picker-react";
import { useAppSelector } from "@/redux/hooks";
import { PopoverContent } from "@/components/ui/popover";

export function IconPicker({ onChange }: { onChange: React.Dispatch<React.SetStateAction<string>> }) {
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
                onEmojiClick={({ emoji }) => onChange((previous) => previous + emoji)}
            />
        </PopoverContent>
    );
}
